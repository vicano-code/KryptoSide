# KryptoSide - A Portfolio Project done at the ALX SE Foundations Program

## Introduction
KryptoSide is a free and user-friendly web service that provides users with information and statistics about the cryptocurrency market and coins. It has a simple interactive user interface consisting of several features. The application uses a REST API to connect and retrieve crypto data from reliable sources. It features real-time crypto price updates, summary information for requested coins, charts/graphs, news and useful links.
### Objectives of the Project
- Design a simple, responsive and dynamic user interface.
- Ensure seamless API integration 
- Provide real-time updates of coin prices as well as up-to-date statistics.
- Ensure reliable database connection. 
- Ensure user satisfaction.
### Authors
Victor C. Anokwuru
### Useful Links
- [KryptoSide App](http://vicano-code20.tech/kryptoside)
- [Github](https://github.com/vicano-code/KryptoSide)

## Installation
Follow these steps to install and set up the project on your local machine.
#### Clone the Repository:
Clone the repository to your local machine using Git:
```sh
git clone https://github.com/vicano-code/KryptoSide.git
cd KryptoSide
```
#### Create a virtual environment and install dependencies:
```sh
sudo pip3 install virtualenv
virtualenv env
```
```sh
# Activate the virtual environment
# On Windows
.\env\Scripts\activate

# On macOS/Linux
source env/bin/activate
```
```sh
# Install dependencies
pip install -r requirements.txt
```
#### Add environment variables
- Register for a free API key at [coingecko](https://docs.coingecko.com/v3.0.1/reference/setting-up-your-api-key)
- Copy the key and use it in your COINGECKO_API_KEY environment variable
```sh
KSIDE_MYSQL_USER='kside'
KSIDE_MYSQL_PWD='kside_pwd'
KSIDE_MYSQL_DB='kside_db'
COINGECKO_API_KEY='#########'
```
#### Database Setup
```sh
# On Linux
cat setup_mysql_kside_dev.sql | sudo mysql -u root -p
```

## Usage
### Starting the Server
- To start the server, navigate to the root directory of your project and run:
```sh
python3 -m app.py
```
- Once the server is running, open your web browser and go to:
```sh
http://localhost:5001/kryptoside
```
![Demo](static/images/demo.gif)

## Environment
- OS - Ubuntu-20.04 LTS
- Language - Python==3.8.10
- Frontend - HTML, CSS, JavaScript, jQuery, Ajax
- Backend/Web Framework - Python Flask==3.0.3, jinja2==3.1.4
- REST API - coingecko
- Database - MySQL/8.0.37, SQLAlchemy
- Web Server - Nginx==1.18.0
- Application Server - gunicorn==22.0.0
- Version Control: GitHub
- Hosting: ALX server(Database Hosting)
- DNS Service - [.Tech Domains](https://get.tech/)
- IDE - VS Code (WSL Ubuntu-20.04)

## Contributing
Contributions are welcome to improve KryptoSide. To contribute to the project, follow these steps:
1. Fork the repository and clone it locally.
```sh
git clone https://github.com/vicano-code/KryptoSide.git
cd KryptoSide
```
2. Create a new branch for your feature or bug fix.
```sh
git checkout -b feature-branch
```
3. Make your changes and test.
4. Commit your changes.
```sh
git commit -am 'Add some comment'
```
5. Push to the branch.
```sh
git push origin feature-branch
```
6. Submit a pull request with a description of your changes.
If you encounter any issues or have suggestions, please create an issue on GitHub. Include as much detail as possible to help in addressing your concern.

## Licensing
MIT License
