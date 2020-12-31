# VUTTR Backend &middot; ![Issues](https://img.shields.io/github/issues/Bruno-Casas/vuttr-backend) ![Stars](https://img.shields.io/github/stars/Bruno-Casas/vuttr-backend) ![License](https://img.shields.io/github/license/Bruno-Casas/vuttr-backend)

![I WorkFlow](https://github.com/Bruno-Casas/vuttr-backend/workflows/CI%20WorkFlow/badge.svg) ![CD WorkFlow](https://github.com/Bruno-Casas/vuttr-backend/workflows/CD%20WorkFlow/badge.svg)

Api for the VULTR application (Very Useful Tools to Remember)

## :information_source: About

This API was proposed as a back-end challenge by the [BossaBox](https://bossabox.com/para-profissionais). platform. It's a simple application to manage a repository useful tools to remember. It was developed with the TypeScript language and focused on performance and efficiency.

## :bookmark_tabs: Table of Contents

- [About](#about)
- [Table of Contents](#table-of-Contents)
- [How to use](#how-to-use)
- [How to deploy](#how-to-deploy)
  - [Pre Requisitos](#pre-requisitos)
  - [Local files](#local-files)
  - [Remote files](#remote-files)
  - [Multiple files](#multiple-files)
  - [Combo](#combo)
- [Tests](#testes)
- [Tecnologias](#tecnologias)

## Status

:construction:  VUTTR backend under construction...  :construction:

### Features

- [x] Users registration
- [x] User authentication and authorization
- [x] Tools registration
- [x] List of tools
- [x] List of tools with filters
- [ ] Users change
- [ ] Tools change
- [x] Easy deploy with containers

### :hammer_and_wrench: Technologies

Main tools used to build this project:

- [TypeScript](https://www.typescriptlang.org/)
- [Node.js](https://nodejs.org/en/)
- [TypeORM](https://typeorm.io/#/)
- [PostgreSQL](https://www.postgresql.org/)
- [Express](https://expressjs.com)

## :gear: How to Use

:link: The API documentation can be accessed in the demo deployment available [here](https://vuttr-server-side.herokuapp.com/).

## :technologist: Where to start

### :heavy_check_mark: Prerequisites

Before starting, you will need to have the following tools installed on your machine:

- [Git](https://git-scm.com)
- [Node.js](https://nodejs.org/en/)
- A code editor ( [Atom](https://atom.io/), [VsCode](https://code.visualstudio.com/), [Vim](https://www.vim.org/), etc... )

### :arrow_down: Download and run

Clone this repository:

``` bash
git clone https://github.com/Bruno-Casas/vuttr-backend
```

Access the project folder:

``` bash
cd vuttr-backend
```

Install the dependencies:

``` bash
npm install
```

Run development server:

``` bash
Start development server:
```

The server will start at port 3000. Go to <http://localhost:3000>.

### :building_construction: Build the project

After installing the dependencies run::

``` bash
#The compiled project will be created in the dist folder.
npm run build
```

To build a docker image:

``` bash
# An image will be created with the name vuttr-backend.
npm run build:docker
```


### Autor

---

[![BrunoCasas avatar](https://avatars3.githubusercontent.com/u/32437831?s=100&u=552d37e03609b7a45acad5ce3c5c90cc74950df0&v=4)
Bruno Casas](https://github.com/Bruno-Casas)
With a whim by Bruno Casas! :smile:

[![Linkedin Badge](https://img.shields.io/badge/-Bruno_Casas-blue?logo=Linkedin&logoColor=white)](https://www.linkedin.com/in/brunocasas/)&emsp;[![Gmail Badge](https://img.shields.io/badge/-brunocasas04@gmail.com-red?logo=Gmail&logoColor=white)](mailto:brunocasas04@gmail.com)
