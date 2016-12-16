#! /usr/bin/env node
'use strict'
const slugF = require('slugg')
const fs = require('fs')

function handleObject (csv, arg, inArray, parentKey, index) {
  Object.keys(arg).forEach((key) => {
    let value = arg[key]
    if (Array.isArray(value)) {
            // handleArray(value)
      for (let i = 0; i < value.length; i++) {
        let arrayItemAtI = value[i]
        if (arrayItemAtI === Object(arrayItemAtI)) {
          handleObject(csv, arrayItemAtI, true, slugF(key), i)
        } else {
          let slug = `${slugF(key)}_${i}`
          if (inArray) {
            slug = `${parentKey}_${index}_${slugF(key)}_${i}`
          } else if (parentKey !== '') {
            slug = `${parentKey}_${slugF(key)}_${i}`
          }
          csv[slug] = arrayItemAtI
          value[i] = '${' + slug + '}'
        }
      }
    } else if (value === Object(value)) {
      handleObject(csv, value, false, slugF(key), 0)
    } else {
      let slug = slugF(key)
      if (inArray) {
        slug = `${parentKey}_${index}_${slug}`
      } else if (parentKey !== '') {
        slug = `${parentKey}_${slug}`
      }
      csv[slug] = value
      arg[key] = '${' + slug + '}'
    }
  })
}

if (process.argv.length === 3) {
  let input = process.argv[2]
  let files = fs.readdirSync(input)
  let csvs = []
  files.forEach((file) => {
    console.log(`Processing ${input}\\${file} ...`)
    let obj = JSON.parse(fs.readFileSync(`${input}\\${file}`))
    let csv = {}
    handleObject(csv, obj, false, '', 0)
    fs.writeFileSync(`${input}\\modified_${file}`, JSON.stringify(obj))
    console.log(`${input}\\${file} modified to ${input}\\modified_${file} \n`)
    csvs.push(csv)
  })

  let keys = Object.keys(csvs[0])
  let values = []

  for (let j = 0; j < csvs.length; j++) {
    let str = ''
    let x = csvs[j]
    for (let k = 0; k < keys.length; k++) {
      if (typeof x[keys[k]] !== 'undefined') {
        if (k === 0) {
          str = x[keys[k]]
        } else {
          str = str + `,${x[keys[k]]}`
        }
      }
    }
    let localKeys = Object.keys(x)

    for (let p = 0; p < localKeys.length; p++) {
      if (keys.indexOf(localKeys[p]) === -1) {
        keys.push(localKeys[p])
        str = str + `,${x[localKeys[p]]}`
      }
    }
    str = str + '\n'
    if (str.indexOf(',') === 0) {
      str = str.substring(1)
    }
    values.push(str)
  }

  fs.appendFileSync(`${input}\\input.csv`, keys + '\n')
  for (var l = 0; l < values.length; l++) {
    fs.appendFileSync(`${input}\\input.csv`, values[l])
  }

  console.log(`CSV file created : ${input}\\input.csv`)
}

