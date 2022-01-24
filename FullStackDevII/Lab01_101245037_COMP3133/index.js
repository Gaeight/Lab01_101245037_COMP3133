const csv = require('csv-parser')
const fs = require('fs')
const results = []

fs.createReadStream('input_countries.csv')
    .pipe(csv({}))
    .on('data', (data) => results.push(data))
    .on('end', (canada = 'Country, Year, Population\n', usa = 'Country, Year, Population\n') => {
        //Filters the array through a for loop 
        for (var i = 0; i != results.length; i++) {
            if(results[i].country == 'Canada') {
                canada += `${results[i].country} ${results[i].year} ${results[i].population}\n`
            }
            if(results[i].country == 'United States') {
                usa += `${results[i].country} ${results[i].year} ${results[i].population}\n`
            }
        }

        //Deletes canada if the file exist
        fs.unlink('canada.txt', (err) => {
            if (err) {
                console.log(err)
                return
            }
            console.log('canada.txt was deleted')
        })
        //Deletes usa if the file exist
        fs.unlink('usa.txt', (err) => {
            if (err) {
                console.log(err)
                return
            }
            console.log('usa.txt was deleted')
        })

        //this creates the text file and adds only all the results that are equal to canada
        fs.writeFile('canada.txt', canada, (err) => {
            if (err) {
                console.log(err)
                return
            }
            console.log('The text file \"canada.txt\" was created')
        })
        //this creates the text file and adds only all the results that are equal to canada
        fs.writeFile('usa.txt', usa, (err) => {
            if (err) {
                console.log(err)
                return
            }
            console.log('The text file \"usa.txt\" was created')
        })
        console.log(`${canada} \n ${usa}`)
    })
