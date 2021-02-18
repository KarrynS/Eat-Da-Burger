// Make sure we wait to attach our handlers until the DOM is fully loaded.
document.addEventListener('DOMContentLoaded', (event) => {
    if (event) {
      console.info('DOM loaded');
    }

    // CREATE

    // Set up event listener for adding a burger
    const addBurgerBtn = document.getElementById("create-form");

    if(addBurgerBtn) {
        addBurgerBtn.addEventListener('submit', (e) => {
            e.preventDefault();

            const newBurger = {
                name: $("#newBurger").val().trim(),
            };
            //Send POST request to create new burger
            fetch('/', {
                method: 'POST', 
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json', 
                },
                body: JSON.stringify(newBurger),
            }).then(() => {
                document.getElementById('newBurger').value = '';
                console.log("New burger added to list!")
                location.reload();
            });
        });
    }

     // UPDATE
  const devourItBtn = document.querySelectorAll('.devourIt');

  // Set up the event listener for devouring burger
  if (devourItBtn) {
    devourItBtn.forEach((button) => {
      button.addEventListener('click', (e) => {
        // Grabs the id of the element that goes by the name, "id"
        const id = e.target.getAttribute('data-id');
        const newlyDevoured = e.target.getAttribute('data-newlydevoured');

        const devouredState = {
          devoured: newlyDevoured,
        };
        console.log("devouredState", devouredState)
        fetch(`/api/burgers/${id}`, {
          method: 'PUT',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(devouredState),
        }).then((response) => {
          //console.log("DevourIt", response)
          if (response.ok) {
            console.log(`Burger devoured: ${newlyDevoured}}`);
            location.reload();
          } else {
            alert('something went wrong!');
          }
        });
      });
    });
  }

});












