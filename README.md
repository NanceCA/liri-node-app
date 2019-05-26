# The Liri Node App

May 2019

## About the Liri Node App

The following application leverages a variety of APIs to provide users information on songs, concerts and movies.

The app deploys in the Node.js environment. Output is viewed on the command prompt/ command line/ PowerShell etc.,

## Running the Application

The application takes the following commands:

**spotify-this-song:** outputs information sourced from Spotify on a searched song/track
**do-what-it-says:** reads text file that runs corresponding command and leverages datapoint
**movie-this:** outputs movie information sourced from the OMDB API
**concert-this:** outputs artist's concert information from the BandsinTown API

```
node liri-app.js commandName dataPoint
```

```
node liri-app.js spotify-this-song piano hand
```

### A screenshot of the terminal /bash window output

###### Output searching for a movie
![FirstScreenshot](/movie-this.PNG)