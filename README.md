# Forum App
This is a App for a Forum with front end in react and backend in laravel so to run it please follow the below Backend & Front End Setup.
- [Laravel](https://github.com/AshhadS/forum_app) 
- [React](https://github.com/AshhadS/forum-fe)

Backend Setup
------------

Clone the codebase from git
```bash
git clone https://github.com/AshhadS/forum_app.git
```

Import all dependancies
```bash
composer install
```

Create the database
 note the default table name is "forum_app" to change this go to

Create all the tables
```bash
php artisan migrate
```
Creating the roles
```bash
 - php artisan permission:create-role guest
 - php artisan permission:create-role admin
```
The first user that is registered will be an admin for the moment

Run the backend
```bash
php artisan serve
```


Front End Setup
---------------
Clone the codebase from git
```bash
git clone https://github.com/AshhadS/forum-fe.git
```

Import React Dependancies
```bash
npm install
```

Run the app
```bash
npm start
```

# Foobar

Foobar is a Python library for dealing with word pluralization.

## Installation

Use the package manager [pip](https://pip.pypa.io/en/stable/) to install foobar.

```bash
pip install foobar
```