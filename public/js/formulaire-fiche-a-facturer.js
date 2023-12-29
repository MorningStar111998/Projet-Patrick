$(document).ready(function () {
  // Handle form submission
  $("#myForm").submit(function (event) {
    event.preventDefault();

    // Get form data
    var formData = {};
    $("#myForm")
      .serializeArray()
      .forEach(function (item) {
        formData[item.name] = item.value;
      });

    // Log the form data (you can modify this part)
    console.log(formData);
  });
});
