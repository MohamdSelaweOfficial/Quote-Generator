
//in order to make the page dynamic(change the text)we remove the text inside the html elemnt 
//and make values that is connected to these element by their id and what ever value they have the html will have it as well
const quoteContainer=document.getElementById('quote-container');
const quoteText=document.getElementById('quote');
const authorText=document.getElementById('author');
const twitterBtn=document.getElementById('twitter');
const newQuoteBtn=document.getElementById('newquote');
const loader=document.getElementById('loader');


let apiQuotes=[]

//show loading
function loading(){
    // hidden is html elemnt that hide stuff and false make it unhidden
    loader.hidden=false;
    // quotecontainer hold value of the whole body that include everything
    quoteContainer.hidden=true;
}
//hide loading
function complete(){
    quoteContainer.hidden=false;
    loader.hidden=true;
}
// new quote funcation
function newQuote(){
    loading();
    // pick random quote from apiquote array
    // so math random make random number between 1 and 0 and we multiply it with api length so we can get a random number
    // math floor take this 1.6854  and make it 2 and it make 1.215 to 1
    const quote=apiQuotes[Math.floor(Math.random()*apiQuotes.length)]
    // how to change the quote each time we load the page 
    // first we make const that target the id (the one on line 4 to 8)
    //quote.author is just an array so in order to take the author value we need to write the name of the array which "quote" and then ".author" and ".text" for the quote itself
    //the "if" to check if the author is set to "null" and replace it with "Unknown"
    if(!quote.author){
        authorText.textContent="Unknown";
    } else{
        authorText.textContent=quote.author;
    }
    //check quote length
    if(quote.text.length>40){
        quoteText.classList.add('long-quote');
    } else{
        quoteText.classList.remove('long-quote');
    }
    quoteText.textContent=quote.text;
    complete();

}
// take quotes from API
async function getQuotes(){
    loading();
    const apiUrl="https://type.fit/api/quotes"
    try{
        const response=await fetch(apiUrl);
        apiQuotes=await response.json();
        newQuote();
    } catch(error){
        // catch error
    }
}

    //tweet quote
    function tweetQuote(){
        const tweeterUrl=`https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
        window.open(tweeterUrl,'_blank');
    }

    //event listeners check if we the user clicked something to activate a funcation we made
    //like making new quote 
    newQuoteBtn.addEventListener('click',newQuote);
    twitterBtn.addEventListener('click',tweetQuote);

getQuotes();
