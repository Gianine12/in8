const puppeteer = require('puppeteer');

module.exports = {
  async roboPesquisa(req, res){
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    const url = `https://webscraper.io/test-sites/e-commerce/allinone/computers/laptops`;
    await page.goto(url);

    const resultado = await page.evaluate((item) => {
      const nodeList = document.querySelectorAll('.thumbnail');

      const thumnArray = [...nodeList];
      const newElement = thumnArray.map( (item) => {
        let img = item.children[0].getAttribute('src');
        let rating =  Number(item.children[2].children[1].getAttribute('data-rating'));
        let price = Number(item.children[1].children[0].innerHTML.replace('$',''));
        let nameProduct = item.children[1].children[1].querySelector('.title').innerHTML;
        let description = item.children[1].querySelector('.description').innerHTML;
        let review = Number(item.children[2].children[0].innerHTML.replace(' reviews', ''));
        
        return {
          img,
          rating,
          price,
          nameProduct,
          description,
          review
        }
      })
      return newElement
    })

    await browser.close();

    const filtered = resultado.filter((item) => {
      if(item.nameProduct.includes('Lenovo')){
        return item;
      }
    })
    
    const resEnd = filtered.sort((a,b) => {
      return a.price - b.price
    })

    return res.status(200).json(resEnd);
  },
}