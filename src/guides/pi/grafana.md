# :bar_chart: Setting Up a Grafana Dashboard

Now that your Pi is up and running, you'll probably want to have a convenient way to monitor it at a glance - *especially* if you overclocked it.
My tool of choice for this is [Grafana](https://grafana.com/) - an easy-to-use, general-purpose dashboard system.
In this section, I'll show you how to set up a Grafana server on your Pi and give you my own dashboard you can use to watch your Pi.

**WARNING: this dashboarding setup uses some of Nimbus's still-in-development features.
Nimbus doesn't expose its metrics by default yet, so you have to manually compile it with some special flags.
This means that this process will ONLY WORK with Native setups - it WILL NOT WORK with Docker setups yet.**

**If enough people ask for it, maybe I'll publish a modified Docker image that has metrics enabled so you can do this.**

With that out of the way, here is a quick glance of my dashboard that you'll put together for your Pi:

![](images/Dashboard.png)

This captures just about every metric I think I'd like to see at a glance.
There are some more Nimbus-specific metrics coming down the pipe as well, such as the inclusion distance of each attestation and the ETA until the next attestation.
I'll be sure to add those once they're in!


## Building Nimbus

Nimbus doesn't currently export metrics by default.
The team is working on it, but right now you have to build it manually with a special flag to enable metrics support.

Start by shutting down Geth and Nimbus, because you're going to need all of the CPU power you can get:
```
$ sudo systemctl stop nimbus
$ sudo systemctl stop geth
```

Now, make sure you have all of the necessary packages installed:
```
$ sudo apt install build-essential git
```

Next, pull Nimbus's source and build it with the `insecure` flag (this is the one needed for metrics support):
```
$ cd ~
$ git clone https://github.com/status-im/nimbus-eth2.git
$ cd nimbus-eth2
$ make NIMFLAGS="-d:insecure" nimbus_beacon_node
```

**Note:** This build process is going to take **a long time**.
Like, it took me around 35 minutes to build on a non-overclocked Pi. 
If you're going to overclock, do it now... just make sure it's stable first.

Once it's done, replace the old Nimbus binary with this one:
```
$ sudo mv /srv/nimbus/nimbus /srv/nimbus/nimbus_old
$ sudo mv build/nimbus_beacon_node /srv/nimbus/nimbus
```

The file `/srv/nimbus/nimbus_old` is a backup of the old client, so you can always restore it if something goes wrong.

Now, open `/etc/systemd/system/nimbus.service` with an editor and add these arguments to the `ExecStart` line:
```
--metrics --metrics-address=127.0.0.1
```

Now save and exit, and restart the Geth and Nimbus services:
```
$ sudo systemctl daemon-reload
$ sudo systemctl start geth
$ sudo systemctl start nimbus
```

With that, Nimbus is now exporting metrics on port 8008.


## Setting Up Prometheus

Nimbus's metrics reporting system may report its current status, but that's all it does.
It doesn't store its past state, and it doesnt report information about the OS or your Pi's hardware in general.
For those capabilities, you're going to want to install [Prometheus](https://prometheus.io/) - a metrics aggregation and storage application:
```
$ sudo apt install prometheus
```

Next, open the configuration file:
```
$ sudo nano /etc/prometheus/prometheus.yml
```

Add this to the end, in the `scrape_configs` section, which will tell it to gather metrics from Nimbus:
```
  - job_name: nimbus
    static_configs:
      - targets: ['localhost:8008']
```

Now modify the prometheus process so it is limited to one core (the "free" one we left alone during the Native setup):
```
$ sudo nano /lib/systemd/system/prometheus.service
```

Change the `ExecStart` line by adding `taskset 0x02` in front of it:
```
ExecStart=taskset 0x02 /usr/bin/prometheus $ARGS
```

Do the same for `/lib/systemd/system/prometheus-node-exporter.service`, which is the process that collects hardware / OS metrics.

Once they're both updated, restart them:
```
$ sudo systemctl daemon-reload
$ sudo systemctl restart prometheus prometheus-node-exporter
```

Great! Now you have a system that collects and stores metrics from Nimbus and your Pi's hardware / OS.
All that's left to do is show it all in a pretty format.


## Setting up Grafana

To show said pretty format, we're going to install and set up Grafana.

Start by installing it (this is kind of a long process, because you have to add Grafana's package server to apt):
```
$ wget -q -O - https://packages.grafana.com/gpg.key | sudo apt-key add -
$ echo "deb https://packages.grafana.com/oss/deb stable main" | sudo tee -a /etc/apt/sources.list.d/grafana.list
$ sudo apt update
$ sudo apt install grafana
```

Now modify `/lib/systemd/system/grafana-server.service` by adding `taskset 0x02` to the start of the `ExecStart` line, then enable and start it:
```
$ sudo systemctl daemon-reload
$ sudo systemctl enable grafana-server
$ sudo systemctl start grafana-server
```

With that, Grafana is up and running an HTTP server on port 3000.

To access it, hop on another machine (such as your laptop or desktop) with a browser, and navigate to:
`http://<your Pi's ip>:3000`

You'll be prompted with a login screen.
The default username and password are both `admin`.
Once you log in, you'll be asked to change your password.
Pick something memorable!

Next, go to the `Configuration` menu on the left (the one with the gear icon) and click `Data Sources`:

![](images/Grafana-Config.png)

Click the `Add data source` button.
When the options come up, hover over Prometheus (it should be on the top) and click `Select`.

In this dialog, type `http://localhost:9090` in the HTTP URL box to point it to the Prometheus instance you just set up on the Pi:

![](images/Grafana-Prometheus.png)

Then click `Save & Test` on the bottom, and you should be all set.

Now, open the `Create` menu on the left (the one with the + icon) and click `Import`:

![](images/Grafana-Import.png)


Next, open up [my Dashboard's JSON code](Nimbus-Dashboard.json).
Copy everything in there, and paste it into the `Import via panel json` box.
Click the `Load` button.
You can change the name and the ID for it here if you want, and when you're done, click `Import`.

Once that's finished, voila!
You should have my dashboard up and running, and showing off all of the stats from your Pi and from Nimbus.

Play around with it, tweak it till your heart's content, and have fun!
Once you're finished I recommend you read up on some literature about Grafana so you can better understand it, and most importantly, configure it so it's nice and secure.
