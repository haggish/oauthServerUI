oauthServerUI
=============

AngularJS-based management UI for OAuth provider data. Just for practice.

Expects a REST/JSON interface to provider data. Example token JSON:

{
    "_id": {
        "$oid": "52062b26e4b08043d178c4d9"
    },
    "clientID": "tonr",
    "resources": [
        "sparklr"
    ],
    "clientSecret": "secret",
    "scope": [
        "read",
        "write"
    ],
    "authorizedGrantTypes": [
        "AUTHORIZATION_CODE",
        "IMPLICIT"
    ],
    "webServerRedirectURI": "http://anywhere",
    "authorities": [
        "ROLE_CLIENT"
    ],
    "accessTokenValidity": 60,
    "refreshTokenValidity": 60,
    "additionalInformation": {
        "name": "Tonr",
        "description": "Some kind of printing app"
    }
}