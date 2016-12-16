# ParameterizeJson
parameterization of json for using it in test scripts

## Install
<code>
npm install -g parameterizejson
</code>

## Usage
<code>
parameterizeJson < foldername >
</code>

Note that folder should contain similar type of requests in json format.
This utility will then create a modified version of each file and also a input.csv file with replaced values

## Prerequisites

Nodejs (4.4.3 +)

## Description

This utility converts json into a parameterized json so that it can be used in test scripts for jmeter and postman.
For eg given following json

```json
{
  "glossary": {
    "title": "example glossary",
    "GlossDiv": {
      "title": "S",
      "GlossList": {
        "GlossEntry": {
          "ID": "SGML",
          "SortAs": "SGML",
          "GlossTerm": "Standard Generalized Markup Language",
          "Acronym": "SGML",
          "Abbrev": "ISO 8879:1986",
          "GlossDef": {
            "para": "A meta-markup language used to create markup languages such as DocBook.",
            "GlossSeeAlso": [
              "GML",
              "XML"
            ]
          },
          "GlossSee": "markup"
        }
      }
    }
  }
}
```

will be converted to
```json
{
  "glossary": {
    "title": "${glossary_title}",
    "GlossDiv": {
      "title": "${glossdiv_title}",
      "GlossList": {
        "GlossEntry": {
          "ID": "${glossentry_id}",
          "SortAs": "${glossentry_sortas}",
          "GlossTerm": "${glossentry_glossterm}",
          "Acronym": "${glossentry_acronym}",
          "Abbrev": "${glossentry_abbrev}",
          "GlossDef": {
            "para": "${glossdef_para}",
            "GlossSeeAlso": [
              "${glossdef_glossseealso_0}",
              "${glossdef_glossseealso_1}"
            ]
          },
          "GlossSee": "${glossentry_glosssee}"
        }
      }
    }
  }
}
```

