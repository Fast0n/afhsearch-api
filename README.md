# AFHSearch API
<a href="https://paypal.me/fast0n" title="Donate"><img src="https://img.shields.io/badge/Donate-PayPal-009cde.svg?style=flat-square"></a>

## Methods
#### search
Search files/devices/developers on Androidfilehost.com

Parameters:
- search [required] - the name of the files/devices/developers
- type [required] - The value field may specify one of the following strings: FILES,  DEVICES, DEVELOPERS


Example Usage:
```
afhsearch-api.herokuapp.com/?search=aosp&
                                  type=files
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
