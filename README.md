# Project Launcher
![release-badge](https://img.shields.io/github/v/release/mjamry/project-launcher?style=for-the-badge)

## Contents

* [Why?](#why)
* [Technologies](#technologies)
* [Installation](#installation)
* [Configuration](#usage)
  * [App settings](#app-settings)
  * [Project configuration](#project-settings)
  * [Themes](#themes)

#### Why?

I'm usually working with multiple projects simultaneously. I used to switch between them on daily basics. This tool should be some kind of aggregator allowing to  trace all Jira updates and give a one place to store all links and scripts related witch each project.

#### Technologies
![Electron](https://img.shields.io/badge/-Electron-gray?style=for-the-badge&logo=electron)
![React](https://img.shields.io/badge/-React-gray?style=for-the-badge&logo=react)
#### Installation

This is an electron app, so installation is as simple as downloading and running installer.
You can find the latest version [Here](https://github.com/mjamry/project-launcher/releases)
#### Configuration

This app has its main configuration file, along with separate config files for each project. Below you can find detailed description for each config entry.

###### App settings

```json
{
  "isDevelopment": , <- Boolean. To enable dev tools for the app.
  "jiraUrl": "", <- String. Url to the Jira server from which you want to get updates.
  "jiraToken": "", <- String. Jira Token to identify your user on Jira.
  "jiraRefreshTimeoutInMinutes": , <- Number. Defines how often check Jira for updates.
  "jiraHistoryTimeInMinutes": , <- Number. Defines time range for Jira items fetched on the startup.
  "jiraChangelogFields": [], <- Strings. Defines which fields to show for each jira ticket.
  "theme": { <- Colors in hex code format
    "primaryBackgroundColor": ,
    "primaryColor": ,
    "secondaryBackgroundColor": ,
    "secondaryColor": ,
    "background":,
    "highlightBackgroundColor": ,
    "highlightColor": ,
  }
}

```
###### Project settings

```json
{
  "id": , <- String. Project ID displayed on menu. :exclamation: Required.
  "name": , <- String. Project name displayed on the project page. :exclamation: Required.
  "iconUrl": , <- String. Project icon displayed on the menu. :warning: Not yet supported.
  "jiraId": , <- String. Jira ID for project.
  "links":
    [
      {
        "name": , <- String. Displayed name.
        "url": <- String. Url to open in a browser.
      }
    ],
  "scripts":
    [
      {
        "name": , <- String. Displayed name.
        "path": <- String. Path to a local application/script.
      }
    ]
}
```
###### Themes

Here you can find some example themes.

Dark green:
![](https://img.shields.io/static/v1?label=&message=%20&color=2f3e46)![](https://img.shields.io/static/v1?label=&message=%20&color=cad2c5)![](https://img.shields.io/static/v1?label=&message=%20&color=84a98c)![](https://img.shields.io/static/v1?label=&message=%20&color=2f3e46)![](https://img.shields.io/static/v1?label=&message=%20&color=52796f)
```json
  "theme": {
    "primaryBackgroundColor": "#2f3e46",
    "primaryColor": "#cad2c5",
    "secondaryBackgroundColor": "#84a98c",
    "secondaryColor": "#2f3e46",
    "background": "#52796f"
  }
```

Light brown:
![](https://img.shields.io/static/v1?label=&message=%20&color=b08968)![](https://img.shields.io/static/v1?label=&message=%20&color=7f5539)![](https://img.shields.io/static/v1?label=&message=%20&color=e6ccb2)![](https://img.shields.io/static/v1?label=&message=%20&color=9c6644)![](https://img.shields.io/static/v1?label=&message=%20&color=ede0d4)
```json
  "theme": {
    "primaryBackgroundColor": "#b08968",
    "primaryColor": "#7f5539",
    "secondaryBackgroundColor": "#e6ccb2",
    "secondaryColor": "#9c6644",
    "background": "#ede0d4"
  }
```
