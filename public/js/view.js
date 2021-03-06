$(document).ready(function() {
  // Getting a reference to the input field where user adds a new band
  var newBandInput = $("input.new-band");
  // New band will go inside the bandContainer
  var bandContainer = $(".band-container");
  // Adding event listeners for deleting, editing, and adding bands
  $(document).on("click", "button.delete", deleteBand);
  $(document).on("click", ".band-item", editBand);
  $(document).on("keyup", ".band-item", finishEdit);
  // $(document).on("blur", ".band-item", cancelEdit);
  $(document).on("submit", "#band-form", insertBand);

  // Initial bands array
  var bands = [];

  // Getting bands from database when page loads
  getBands();

  // This function resets the bands displayed with new bands from the database
  function initializeRows() {
    bandContainer.empty();
    var rowsToAdd = [];
    for (var i = 0; i < bands.length; i++) {
      rowsToAdd.push(createNewRow(bands[i]));
    }
    bandContainer.prepend(rowsToAdd);
  }

  // This function grabs bands from the database and updates the view
  function getBands() {
    $.get("/", function(data) {
      bands = data;
      initializeRows();
    });
  }

  // This function deletes a band when the user clicks the delete button
  function deleteBand() {
    var id = $(this).data("id");
    $.ajax({
      method: "DELETE",
      url: "/index/delete/" + id
    }).done(function() {
      getBands();
    });
  }

  function toggleComplete() {
    var band = $(this)
      .parent()
      .data("band");

    band.complete = !band.complete;
    updateBand(band);
  }

  // This function handles showing the input box for a user to edit a band
  function editBand() {
    var currentBand = $(this).data("band");
    $(this).children().hide();
    $(this).children("input.edit").val(currentBand.band_name);
    $(this).children("input.edit").show();
    $(this).children("input.edit").focus();
  }

  // This function starts updating a band in the database if a user hits the "Enter Key"
  // While in edit mode
  function finishEdit(event) {
    var updatedBand;
    if (event.key === "Enter") {
      updatedBand = {
        id: $(this).data("todo").id,
        text: $(this).children("input").val().trim()
      };
      $(this).blur();
      updateBand(updatedBand);
    }
  }

  // This function updates a band in our database
  function updateBand(band) {
    var id = $(this).data("id");
    $.ajax({
      method: "PUT",
      url: "/index/update" + id,
      data: band
    }).done(function() {
      getBands();
    });
  }

  // This function is called whenever a todo item is in edit mode and loses focus
  // This cancels any edits being made
  // function cancelEdit() {
  //   var currentBand = $(this).data("band");
  //   $(this).children().hide();
  //   $(this).children("input.edit").val(currentBand.text);
  //   $(this).children("span").show();
  //   $(this).children("button").show();
  // }

  // This function constructs a todo-item row
  function createNewRow(create) {
    var newInputRow = $("<li>");
    newInputRow.addClass("list-group-item band-item");
    var newBandSpan = $("<span>");
    newBandSpan.text(bands.text);
    newInputRow.append(newBandSpan);
    var newBandInput = $("<input>");
    newBandInput.attr("type", "text");
    newBandInput.addClass("edit");
    newBandInput.css("display", "none");
    newInputRow.append(newBandInput);
    var newDeleteBtn = $("<button>");
    newDeleteBtn.addClass("delete btn btn-default");
    newDeleteBtn.text("x");
    newDeleteBtn.data("id", create.id);
    newInputRow.append(newDeleteBtn);
    newInputRow.data("bands", create);
    return newInputRow;
  }

  // This function inserts a new band into our database and then updates the view
  function insertBand(event) {
    event.preventDefault();
    // if (!newItemInput.val().trim()) {
    //   return;
    // }
    var band = {
      band_name: newBandInput.val().trim(),
      hall_of_fame: false
    };

    $.post("/index/create", band, function() {
      getBands();
    });
    newBandInput.val("");
  }

});