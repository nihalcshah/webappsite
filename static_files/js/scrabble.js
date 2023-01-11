async function doTheFetch(){
    console.log("hit")
    console.log(document.getElementById("word"))
    const response = await fetch('../scrabblejson')
    const data = await response.json()

    let counter_span = document.getElementById("k")
    counter_span.innerHTML = data.visitor;
}
