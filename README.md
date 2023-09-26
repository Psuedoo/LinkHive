<h1 align="center">LinkHive</h2>
<p align="center">Self-hosted bookmark manager.</p>

![LinkHive Logo]("/../public/LinkHive.svg")

@sample.svg
<?xml version="1.0" encoding="UTF-8"?>
<svg id="Layer_2" data-name="Layer 2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 374.77">
  <defs>
    <style>
      .cls-1 {
        font-family: SEEAMERICA, 'SEE AMERICA';
        font-size: 202.54px;
      }

      .cls-1, .cls-2 {
        fill: #231f20;
      }

      .cls-2 {
        stroke-width: 0px;
      }
    </style>
  </defs>
  <g id="Layer_1-2" data-name="Layer 1">
    <g>
      <g>
        <path class="cls-2" d="m650.15,64.36h-65.71l-32.73,58.68,32.73,58.66h65.71l32.73-58.66-32.73-58.68Zm-6.98,105.29h-51.74l-26-46.6,26-46.63h51.74l26,46.63-26,46.6Z"/>
        <path class="cls-2" d="m867.27,64.38h-65.71l-32.73,58.68,32.73,58.66h65.71l32.73-58.66-32.73-58.68Zm-6.98,105.29h-51.74l-26-46.6,26-46.63h51.74l26,46.63-26,46.6Z"/>
        <g>
          <path class="cls-2" d="m574.34,58.68L541.61,0h-65.71l-32.73,58.68,32.73,58.66h65.71l32.73-58.66Zm-39.71-46.63l26,46.63-26,46.6h-51.74l-26-46.6,26-46.63h51.74Z"/>
          <path class="cls-2" d="m791.44,58.68L758.71,0h-65.71l-32.73,58.68,32.73,58.66h65.71l32.73-58.66Zm-39.71-46.63l26,46.63-26,46.6h-51.74l-26-46.6,26-46.63h51.74Z"/>
          <g>
            <path class="cls-2" d="m791.44,187.39l-32.73-58.68h-65.71l-32.73,58.68,32.73,58.66h65.71l32.73-58.66Zm-39.71-46.63l26,46.63-26,46.6h-51.74l-26-46.6,26-46.63h51.74Z"/>
            <path class="cls-2" d="m791.44,316.11l-32.73-58.68h-65.71l-32.73,58.68,32.73,58.66h65.71l32.73-58.66Zm-39.71-46.63l26,46.63-26,46.6h-51.74l-26-46.6,26-46.63h51.74Z"/>
          </g>
        </g>
      </g>
      <text class="cls-1" transform="translate(0 311.65)"><tspan x="0" y="0">LINKHIVE</tspan></text>
    </g>
  </g>
</svg>
@sample.svg

### Contents
- [Contents](#contents)
- [About LinkHive](#about-linkhive)
- [Setup](#setup)
- [Local Development Setup](#local-development-setup)
- [To dockerize the application](#to-dockerize-the-application)
- [Features](#features)
- [Roadmap](#roadmap)

### About LinkHive
LinkHive is a self-hosted bookmark manager built with NextJS.

### Setup
Currently LinkHive is still in development and not suggested in any way to be used in production.
### Local Development Setup
Will update these instructions cleaner if/when it becomes a higher priority.

This is a ReactJS app using NextJS. So you'll need all of the dependencies that come along with that.

There also might need to be some prep that involves Prisma. Maybe running `npx prisma db push` and `npx prisma db seed`?

Create a `.env` containing:
```
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=say_lalisa_love_me_lalisa_love_me_hey
```

Run `npm run dev`


### To dockerize the application 
```
docker build -t linkhive-app .
docker run -p 3000:3000 linkhive-app
```

### Features
- You can have bookmarked links

### Roadmap
- [x] CRUD operations on links
- [x] Navigation
- [x] Docker support
- [ ] Multi-user support
- [ ] Hexagonal links
- [ ] Status checking for links
