// Deployment Steps to AWS using Ubuntu Server 16.04
1 - Before you push project up to GitHub - Delete the .git folder in your Angular App folder.
2 - Make sure to add a .gitignore file in your project folder and type node_modules/ and save.
3 - Enter AWS, and click launch new instance.
    Select Ubuntu 16.04 LTS
    Select t2.micro
    Set security settings:
    ssh 0.0.0.0, (Anywhere or myIP)
    http 0.0.0.0 (Anywhere)
    https 0.0.0.0 (Anywhere, or don't set it)
    Download a .pem key from AWS - Unless you already have a .pem key.
4 - cd into your .pem key folder.
5 - sudo apt-get update
6 - sudo apt-get install -y build-essential openssl libssl-dev pkg-config
    In the ubuntu terminal, one at a time because they require confirmation: (these install basic node and npm)
7 - sudo apt-get install -y nodejs nodejs-legacy
    Note: In case this does not work, try sudo apt install nodejs-legacy instead.
8 - sudo apt-get install npm
9 - sudo npm cache clean -f
10- In the ubuntu terminal: These install the node package manager n and updated node.
11- sudo npm install -g n
12- sudo n stable (or whichever node version you want e.g. 5.9.0)
13- node -v should give you the stable version of node, or the version that you just installed.
14- Install NGINX and git:
15- sudo apt-get install nginx
16- sudo apt-get install git
17- Make your file folder:
18- Enter the folder:
19- cd /var/www
20- Clone your project:
21- sudo git clone {{your project file path on github/bitbucket}}
22- sudo npm install -g @angular/cli
23- When this part freaks out - hit Ctrl-C and rerun sudo npm install -g @angular/cli - this is a know errror on AWS
24- Install - sudo npm install
25- cd into the angular app folder and run sudo npm install there too.
26- Type in the command: sudo ng build
27- Now follow the rest of the steps in the AWS Deployment