<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Marvel Character Battle</title>

    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
    <script src="//code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
    <script src="main.js"></script>
    <link href="https://fonts.googleapis.com/css?family=Bungee|Passion+One:700" rel="stylesheet">
    <link rel="stylesheet" href="myStyle.css">


</head>
<body>
    <h1 id="hTitle">Marvel Character Battle</h1>
    <div id="infoDiv">
        <h2>How to play:</h2>
        <p>Type in the name of a Marvel character into each box. <br>
            Once two characters have been found, An epic battle ensues!</p>
    </div>

    <!-- Div for the battle buttons to appear -->
    <div id="optionDiv">
        <input id="battleSubmit" type="submit" value="Battle!">
        <input id="resetButton" type="button" value="Rematch!">
    </div>

<!--    Holds the info and images for character 1 -->
    <div id="character1Div">
        <h2 id="character1_title"></h2>
        <div id="character1ImgArea">
            <img id="character1_img">
        </div>
        <h2 id="character1_score"></h2>
            <h4 id="c1">Character One:</h4>
            <input id="charName1" type="text" name="charName1"><br>
            <input id="char1Submit" class="btnSubmit" type="submit" value="Search">
    </div>

    <!--    Holds the info and images for character 2 -->
    <div id="character2Div">
        <h2 id="character2_title"></h2>
        <div id="character2ImgArea">
            <img id="character2_img">
        </div>
        <h2 id="character2_score"></h2>
            <h4 id="c2">Character Two:</h4>
            <input id="charName2" type="text" name="charName2"><br>
            <input id="char2Submit" class="btnSubmit" type="submit" value="Search">
    </div>
    

</body>
</html>