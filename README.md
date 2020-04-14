# AFHSearch API

[![Donate](https://img.shields.io/badge/Donate-PayPal-blue?style=flat-square)](https://paypal.me/fast0n) ![GitHub package.json version](https://img.shields.io/github/package-json/v/fast0n/afhsearch-api) [![License](https://img.shields.io/github/license/Fast0n/afhsearch-api)](https://github.com/Fast0n/afhsearch-api/blob/master/LICENSE) [![Build Status](https://travis-ci.org/Fast0n/afhsearch-api.svg?branch=master)](https://travis-ci.org/Fast0n/afhsearch-api)

## Methods

#### search

Search files - devices - developers on Androidfilehost.com

Parameters:

- search [required] - the name of the files/devices/developers
- type [required] - The value field may specify one of the following strings: FILES, DEVICES, DEVELOPERS

Example Usage:

```
afhsearch-api.herokuapp.com/?search=aosp&type=files
```

Returns
The standard JSON array

#### files

- name
- url
- ndownload
- size
- upload_date

#### devices

- name
- codename
- url

#### developers

- name
- url

# Result
![JSON result](img/result.png)
