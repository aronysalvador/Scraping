/**
 * Scraping in "Movistar.cl" .
 *
 * @author  Arony Salvador   [arony.salvador@fusiona.com]
 * @version 1.0 (2018/08/01)
 */

const request = require ('request');
const cheerio = require ('cheerio');
const arrayTitles = [];
const arrayCellphone = [];
const arrayTotalCellphone = [];


request('https://ww2.movistar.cl/',
    (error, res,body)=>{
        if(error) return console.log(error);
        if(res.statusCode == 200) return scraping(body);
        return console.log ('ERROR INTERNO');
    });

function scraping (body){
    let $ = cheerio.load(body);
/**
 * Principal Titles.
 */
    $('a.forward_column', 'div.mv-row').each((index,el)=>{
        var titles = $('p',el).text();
        arrayTitles.push(titles); 
            
    });

/**
 * Principal CellPhones.
 */
    $('div.smartphone_item').each((index,el)=>{
        var titleCellphone = $('p.smartphone_slide_name',el).text();
        arrayCellphone.push(titleCellphone);     
    });

/**
 * Data Output
 */
    console.log("Total: "+ arrayTitles.length+ "  Titulos");
    console.log(arrayTitles);
    console.log("Total: "+ arrayCellphone.length+ "  Telefonos in Principal Page");
    console.log(arrayCellphone);

}

request('https://catalogo.movistar.cl/equipomasplan/catalogo.html?_ga=2.61113260.1268068136.1564696651-852662956.1564696651&limit=1000&p=6',
    (error, res,body)=>{
        if(error) return console.log(error);
        if(res.statusCode == 200) return scrapingCellphones(body);
        return console.log ('ERROR INTERNO');
    });
    
function scrapingCellphones(body){
    let $ = cheerio.load(body);    

/**
 * Total CellPhones.
 */
    $('li.product', 'ul.products-list').each((index,el)=>{
        var totalTitleCellphone = $('a.anchor-image',el).attr('title');
        arrayTotalCellphone.push(totalTitleCellphone);     
    });

/**
 * Data Output
 */
    //console.log("Total:  "+ arrayTotalCellphone.length+ "  Telefonos");
    //console.log(arrayTotalCellphone);

}
