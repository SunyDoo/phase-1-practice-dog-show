document.addEventListener('DOMContentLoaded', () => {
    getAllDogs()
    const form = document.getElementById('dog-form')
    //function to fetch dogs
    function getAllDogs(){
        fetch ('http://localhost:3000/dogs')
        .then (res=>res.json())
        .then (dogArr=>dogArr.forEach(dogObj=>renderOneDog(dogObj)))
    }
//function to render one dog
    function renderOneDog(dogObj){
        dogTable = document.getElementById('table-body')
        // console.log(dogTable)
        dogInfo = document.createElement('tr')
        dogInfo.innerHTML = `
            <td>${dogObj.name}</td>
            <td>${dogObj.breed}</td>
            <td>${dogObj.sex}</td>
            <td><button class= 'editButton'>Edit Dog</button></td>
        `
        dogTable.appendChild(dogInfo)
//event listener for edit dog button        
        dogInfo.addEventListener('click', editDog)
        function editDog(e){
//if edit dog button is clicked, form data will be filled with corresponding dog data
            if (e.target.innerText === 'Edit Dog'){
                form.name.value = e.target.parentNode.parentNode.getElementsByTagName('td')[0].innerText
                form.breed.value = e.target.parentNode.parentNode.getElementsByTagName('td')[1].innerText
                form.sex.value = e.target.parentNode.parentNode.getElementsByTagName('td')[2].innerText
//event listener for submit button on form                
                form.addEventListener('submit',handleEdit)
                function handleEdit(e){
                    // e.preventDefault()
//make new dog object with updated form data
                    let newDog = {
                        name: form.name.value,
                        breed: form.breed.value,
                        sex: form.sex.value,
                        id: dogObj.id              
                    } 
                    // console.log(newDog)
//patch to server                  
                    fetch (`http://localhost:3000/dogs/${newDog.id}`,{
                        method: 'PATCH',
                        headers:{
                            "Content-Type": "application/json",
                            Accept: "application/json"
                        },
                        body: JSON.stringify(newDog)
                    })
                    .then(res=>res.json())
                    .then (data=>renderOneDog(data))
                    form.reset()
                }            
            }
            return getAllDogs()                        
        }        
    }        
})

        
