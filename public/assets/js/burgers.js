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
    $(function() {
        $(".devourIt").on("click", (e) => {
            const id = $(this).data("id"); 
            const devoured = $(this).data("newdevoured");
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
});












