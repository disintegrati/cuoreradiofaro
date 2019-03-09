# cuoreradiofaro

Per installare questo git dovrai aver installato raspbian sul vostro raspberry nella versione lite (quella Desktop, in questo caso, non sarà molto utile)

## Scarichiamo e installiamo node sul raspi

inizia col digitare sul terminale

```
uname -m
```
per capire che versione di node supporterà il tuo raspi, adesso scarica il pacchetto giusto per la tua versione da questo link https://nodejs.org/en/download/.

Adesso, da terminale, inserisci wget prima del link preso dal sito precedente (in questo modo scaricheremo l'archivio sul nostro computerino)

Estrai l'archivio digitando

```
tar -xzf nodexxx.tar.gz
```

Nel caso in cui il pacchetto sia un .gz

```
tar xvf nodexxx.tar.xz
```
Nel caso in cui il pacchetto sia un .xz

"SUGGERIMENTO: quando stiamo per scrivere un nome di un file presente nel sistema clicca su TAB per completare automaticamente il nome del suddetto"

Adesso copiamo node in usr/local, uscendo prima dalla cartella

```
cd node-xxxx/
sudo cp -R * /usr/local
```

controlliamo l'installazione con:

```
node -v
npm -v
```

### Installiamo github

Per scaricare github digitiamo

```
sudo apt install git
```

### Scarichiamo e usiamo il file da github

Cloniamo, per prima cosa, la depositories sul raspi digitando

```
sudo git clone https://github.com/mediaintegrati/cuoreradiofaro.git
```

Ora, entriamo all'interno della cartella e digitiamo

```
npm install package.json
```

Creiamo una nuova cartella in pi/

```
sudo mkdir nomecartella/
```

Adesso copiamo i file all'interno della cartella "cuoreradiofaro" e incolliamoli all'interno della nuova cartella crata

```
sudo cp -R * /home/pi/nomecartella
```

Adesso installiamo pigpio con

```
sudo apt install pigpio
sudo npm install package-lock.json
```

Il pin 17 è quello del ledwall, il pin 27 è quello dello switch attivo (manda HIGH dalle 20 alle 8) per abbassare la luminosità.
