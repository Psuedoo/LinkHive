![LinkHive Logo](/public/LinkHive.png)

<p align="center">Self-hosted bookmark manager</p>

# Table of Contents

- [Table of Contents](#table-of-contents)
- [About LinkHive](#about-linkhive)
- [Running LinkHive](#running-linkhive)
  - [Setup](#setup)
  - [Docker](#docker)
- [Local Development Setup](#local-development-setup)
- [Roadmap](#roadmap)

# About LinkHive

LinkHive is a self-hosted bookmark manager built with NextJS.

# Running LinkHive

## Setup

1. Clone the repo with
   `git clone https://github.com/psuedoo/linkhive`
2. Create a `.env` file with the contents in `.env.example` and change to suit your needs. After doing this you should be free to run with one of the below options.

## Docker

The following command runs LinkHive on port 3000. Feel free to update/change this in `docker-compose.yml`.

```bash
docker compose up -d
```

The default login:

- Username: `admin`
- Password: `admin`

After logging in, I recommend changing the password.

# Local Development Setup

Will update these instructions cleaner if/when it becomes a higher priority.

This is a ReactJS app using NextJS. So you'll need all of the dependencies that come along with that.

There also might need to be some prep that involves Prisma. Maybe running `npx prisma db push` and `npx prisma db seed`?

1. Create a `.env` with information from `.env.example`.

2. Run `npm run dev`

# Roadmap

- [x] CRUD operations on links
- [x] Navigation
- [x] Docker support
- [x] Multi-user support
- [ ] Hexagonal links
- [ ] Status checking for links
