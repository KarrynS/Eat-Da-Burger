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

  // Set up the event listener for the create button
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

          // make sure to serialize the JSON body
          body: JSON.stringify(devouredState),
        }).then((response) => {
          console.log("DevourIt", response)
          // Check that the response is all good
          // Reload the page so the user can see the new quote
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

 /*
    // UPDATE
    $(function() {
        $(".devourIt").on("click", (e) => {
            const id = $(this).data("id"); 
            const devoured = $(this).data("newlydevoured");
            const burgerDevoured = {
                devoured: devoured
            };
            // Send the PUT request.
        $.ajax("/api/burgers/" + id, {
            type: "PUT",
            data: burgerDevoured
        }).then(
            function() {
            console.log("Burger Eaten", burgerDevoured);
            // Reload the page to get the updated list
            location.reload();
            }
        );
        });
    })
*/
    /*
$(function() {
  $(".devourIt").on("click", function(event) {
    var id = $(this).data("id");
    var newlyDevoured = $(this).data("newlydevoured");

    var devouredState = {
      devoured: newlyDevoured
    };

    // Send the PUT request.
    $.ajax("/api/burgers/" + id, {
      type: "PUT",
      data: devouredState
    }).then(
      function() {
        console.log("changed devoured to", newlyDevoured);
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });
})
*/
});












