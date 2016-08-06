(function(){
  
  var title = document.getElementById("title"),
      search = document.getElementById("button"),
			display = document.getElementById("display");
      
  search.addEventListener("click", getInfo, false);
  
  function getInfo() {
		
		thisTitle = title.value;
		
		for (var i = 0, length = thisTitle.length; i < length; i++) {
			
			if (thisTitle[i] == " ") {
				var newTitle = "";
				newTitle = thisTitle.substr(0,i) + "+" + thisTitle.substr(i+1);
				thisTitle = newTitle;
			}
			
		} // if space replace with "+"
		
    if (thisTitle == "") {
			
			title.classList.add("check"); //if blank add red outline
			title.focus();
			
		} else {
			
			title.classList.remove("check");
			
			$.getJSON("http://www.omdbapi.com/?t=" + thisTitle + "&y=&plot=short&r=json&tomatoes=true", function(results) {
				
				var mTitle = results.Title,
						mYear = results.Year,
						mRated = results.Rated,
						mRuntime = results.Runtime,
						mActors = results.Actors,
						mDirector = results.Director,
						mGenre = results.Genre,
						mPlot = results.Plot,
						mPoster = results.Poster,
						mImdb = results.imdbRating + "/10",
						mTomatoUser = results.tomatoUserRating + "/5";
						
				if (mDirector == "N/A") {
					mDirector = "Writer(s): " + results.Writer;
				} else {
					mDirector = "Director(s): " + results.Director;
				}
						
				var frameEl = document.createElement("div"),
						titleEl = document.createElement("h1"),
						titleText = document.createTextNode(mTitle),
						yearEl = document.createElement("h6"),
						yearText = document.createTextNode(mYear);
						ratedEl = document.createElement("h5"),
						ratedText = document.createTextNode("Rated: " + mRated),
						runtimeEl = document.createElement("h6"),
						runtimeText = document.createTextNode("Duration: " +mRuntime),
						actorsEl = document.createElement("h6"),
						actorsText = document.createTextNode("Actors: " + mActors),
						directorEl = document.createElement("h6"),
						directorText = document.createTextNode(mDirector);
						genreEl = document.createElement("h6"),
						genreText = document.createTextNode("Genre: " + mGenre);
						plotEl = document.createElement("p"),
						plotText = document.createTextNode(mPlot);
						posterEl = document.createElement("img");
						imdbEl = document.createElement("h6"),
						imdbText = document.createTextNode("IMDB Rating: " + mImdb);
						tomatoEl = document.createElement("h6");
						tomatoText = document.createTextNode("Rotten Tomato User Rating: " + mTomatoUser);
						
				titleEl.appendChild(titleText);
				yearEl.appendChild(yearText);
				ratedEl.appendChild(ratedText);
				runtimeEl.appendChild(runtimeText);
				actorsEl.appendChild(actorsText);
				directorEl.appendChild(directorText);
				genreEl.appendChild(genreText);
				plotEl.appendChild(plotText);
				imdbEl.appendChild(imdbText);
				tomatoEl.appendChild(tomatoText);
				
				if (mPoster == "N/A") {
					posterEl.setAttribute("src", "images/placeholder.png");
				} else {
					posterEl.setAttribute("src", mPoster);
				}
				
				frameEl.appendChild(posterEl);
				frameEl.appendChild(titleEl);
				frameEl.appendChild(yearEl);
				
				if (mRated !== "N/A") {
					frameEl.appendChild(ratedEl);
				}
				
				
				frameEl.appendChild(runtimeEl);
				frameEl.appendChild(actorsEl);
				frameEl.appendChild(directorEl);
				frameEl.appendChild(genreEl);
				
				if (mPlot !== "N/A") {
					frameEl.appendChild(plotEl);
				}
				
				if (mImdb !== "N/A/10") {
					frameEl.appendChild(imdbEl);
				}
				
				if (mTomatoUser !== "N/A/5") {
					frameEl.appendChild(tomatoEl);
				}
				
				
				display.appendChild(frameEl);
				
			});
			
		}
    
  }
  
})();