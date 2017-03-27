$(document).ready(function() {

	var topics = ["Deal With It", "Fangirling", "Feels", "Let Me Love You", "Party Hard", "Spinning Lana", "Steal Yo Girl", "Surprised Patrick", "Forever Alone", "Look at all the Fucks I Give"];

	function createButtons() {
		$("#buttonSpace").empty();

		for (var i = 0; i < topics.length; i++) {
			var topicButtons = $("<button>");
			topicButtons.addClass("btn btn-info buttons");
			topicButtons.attr("data-topic", topics[i]);
			topicButtons.text(topics[i]);
			$("#buttonSpace").append(topicButtons);
		}
	}

	createButtons();

	function displayGifs() {
		var topic = $(this).attr("data-topic");
		var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=dc6zaTOxFJmzC&limit=10";

		$.ajax({
			url: queryURL,
			method: "GET"
		}).done(function(response) {

			for (var i = 0; i < response.data.length; i++) {
				var topicGIFS = $("<figure>");
				var rating = $("<figcaption>");
				var image = $("<img class='gif'>");
				rating.html("rating: " + response.data[i].rating);
				topicGIFS.addClass("gifBox");
				image.attr("src", response.data[i].images.fixed_height_still.url);
				image.attr("data-still", response.data[i].images.fixed_height_still.url);
				image.attr("data-animate", response.data[i].images.fixed_height.url);
				image.attr("data-state", "still");
				topicGIFS.append(rating);
				topicGIFS.append(image);
				$("#imageSpace").prepend(topicGIFS);
			}

			$("#imageSpace").prepend("<h2 class='subtitle'>" + topic + "</h2>");
		})

	};

	function changeState() {
		var state = $(this).data("state");
		if (state === "still") {
			$(this).attr("src", $(this).data('animate'));
        	$(this).data("state", "animate");
		}
		else {
			$(this).attr("src", $(this).data("still"));
        	$(this).data("state", "still");
		}
	};

	$("#addMeme").on("click", function() {
		event.preventDefault();
		var newTopic = $("#addTopic").val().trim();
		console.log(newTopic);
		topics.push(newTopic);
		$("#addTopic").val("");
		createButtons();
	})

	$(document).on("click", ".buttons", displayGifs);
	$(document).on("click", ".gif", changeState);
})