#' ---
#' title: "NBA Analysis"
#' date: "Date field"
#' author: "Louis"
#' output: html_document
#' # Or use output: pdf_document
#' # Or don't use either, in which case you will be prompted to choose
#' ---

x <- read.csv("csv/game_data.csv", as.is = TRUE)

# Not using?  Delete or move to a backup script:
#x$eloPTh <- 1500
#x$eloPTv <- 1500
x$gameno <- 1:nrow(x)           # Create a game number column
x$kfactor <- 0

unique(x$team)                  # Just check the team names

# Create a team summary object, one row per team:
xt <- data.frame(teamN = sort(unique(x$shorthome)),
                 eloScore = 1500,
                 #rows = 0,                    # Not using?  Delete it!
                 stringsAsFactors = FALSE)

# No longer a relevant note?  Delete or move to a backup script!
# rv is the new elo score for the visitor team 
# rh is the new elo score for the home team 

# Collect time series of Elo scores for each team as the season unfolds:
e <- matrix(2300, 30, nrow(x))
rownames(e) <- xt$teamN

# Loop through the season of games:
k <- 20 # Initially, before the loop starts, rather than inside the loop/

for (i in 1:nrow(x)) {
  
  # Since the for the equation, I do not know the type of competitions played, 
  # I will increase the weight constant exponentially throughout the season.
  # Weight constant max = 60, min = 20 
  # The equation, y = 1.003155^x + 20 modules this exponential growth
  
  # We think we want to reduce k through the season so the big jumps become
  # less impactful and the Elo scores become more stable later in the season.
  # I'm just making this up, but you see what happens.
  # k <- k * 0.995
  
  # Here I am using an exponential decrease to make sure that the k value 
  # decrease slowly throughout the season
  k <- -(1.00159 ^ i) + 20
  x$kfactor[i] <- k
  
  
  # kh and kv are representing the k-factor in the equation
  # kh is for the home team, kv is for the visitor team
  # kh <- k
  # # if (x$gamespread[i] == 2){
  # #   kh <- k + k/2
  # # }else if (x$gamespread[i] == 3){
  # #   kh <- k + 3*k/4 
  # # }else if (x$gamespread[i] > 3){
  # #   kh <- k + k*(3/4 + (x$gamespread[i] - 3)/8)
  # # }
  # 
  # kv <- k
  # if (x$gamespread[i] == -2){
  #   kv <- k + k/2
  # }else if (x$gamespread[i] == -3){
  #   kv <- k + 3*k/4 
  # }else if (x$gamespread[i] < -3){
  #   kv <- k + k*(3/4 + (x$gamespread[i] - 3)/8)
  # }
  
  
  # The scores are going up even for the worse teams, how do I make them go 
  # down more
  if (x$gamespread[i] < 2 | x$gamespread[i] >= -2){
    k <- k/2
  } else if (x$gamespread[i] > 2 & x$gamespread[i] <= 7) {
    k <- k * 4/7
  } else if (x$gamespread[i] > 7 & x$gamespread[i] <= 13 ){
    k <- k * 2/3
  } else if (x$gamespread[i] > 13) {
    k <- k * 4/5
  }
  
  if (x$gamespread[i] > -7 & x$gamespread[i] <= -2) {
    k <- k * 4/7
  } else if (x$gamespread[i] < -7 & x$gamespread[i] >= -13 ){
    k <- k * 2/3
  } else if (x$gamespread[i] < -13) {
    k <- k * 4/5
  }
  
  # wh and wv is for the result of the game, where wh is for home team and wv 
  # is for the visitor team, basically indicating win versus lose as 0/1 vals:
  wh <- as.numeric(x$gamespread[i] > 0)
  wv <- 1 - wh

  # The audience number will indicate the amount of home court advantage that a 
  # team gets, the more audience there is, the more advantage the home team will 
  # get.
  
  audSpread <- 0
  # if (is.na(x$attendance[i]) == TRUE){
  #   audSpread <- 10
  # }else if (x$attendance[i] > 1000){
  #   audSpread <- 8*log(3*(x$attendance[i]-1000), 2.718) 
  # }
  # 
  

  
  # weh is the win efficiency of home, while wev is the win efficiency of 
  #visitor
  
  weh <- 1 / (1 + 10^(-(xt$eloScore[xt$teamN == x$shorthome[i]] - 
                          xt$eloScore[xt$teamN == x$shortvis[i]])/400))
  wev <- 1 / (1 + 10^(-(xt$eloScore[xt$teamN == x$shortvis[i]] - 
                          xt$eloScore[xt$teamN == x$shorthome[i]])/400))
  
  # MAYBE FUTURE PLAYING AROUND, NOT NEEDED NOW, IGNORE:
  # This is not working, undefined row used
  # if (hw == TRUE){
  #   # Assign the new elo value 
  #   x1[x1$teamN == x$shorthome[i]]$eloScore <- 
  #     x1[x1$teamN == x$shorthome[i], ]$eloScore + kh * (1-weh)
  #   # Change coding style to line 76
  #   x1[x1$teamN == x$shortvis[i], ]$eloScore <- 
  #     x1[x1$teamN == x$shortvis[i], ]$eloScore + kv * (0-wev)
  # } else {
  #   x1[x1$teamN == x$shorthome[i]]$eloScore <- 
  #     x1[x1$teamN == x$shorthome[i], ]$eloScore + kh * (0-weh)
  #   # Change coding style to line 76
  #   x1[x1$teamN == x$shortvis[i], ]$eloScore <- 
  #     x1[x1$teamN == x$shortvis[i], ]$eloScore + kv * (1-wev)
  # }
  

  # Update the Elo value.  We think currently (April 30) that there are
  # "full-k jumps" and "1/2-k jumps" when teams are close to equal, and then
  # "tiny adjustments" in other cases.  Louis should study this algebra to
  # better understand what types of results give "full-k jumps" and what
  # give those tiny adjustments.  Does this make sense?  Possible.
  
  xt$eloScore[xt$teamN == x$shorthome[i]] <-
    xt$eloScore[xt$teamN == x$shorthome[i]] + k * (wh - weh)
  xt$eloScore[xt$teamN == x$shortvis[i]] <-
    xt$eloScore[xt$teamN == x$shortvis[i]] + k * (wv - wev)
  
  # Save this in the appropriate position of e:
  e[, i] <- xt$eloScore
  e[, i] <-  xt$eloScore
  
}

dir.create("output_json", showWarnings = FALSE)

# Function to create JSON structure for each row
create_json_structure <- function(row_data, v50_value, row_number) {
  # Create list with row data and V50
  json_data <- list(
    row_number = row_number,
    row_data = as.numeric(row_data),  # Convert to numeric to ensure proper JSON formatting
    V50_value = v50_value
  )
  return(json_data)
}

# Load jsonlite package for JSON operations
if (!require("jsonlite")) {
  install.packages("jsonlite")
  library(jsonlite)
}

# Export each row to a separate JSON file

  # Get current row data and V50 value
  
  teams_list <- lapply(1:nrow(e), function(i) {
    list(
      team_name = rownames(e)[i],
      Elo_Score = e[i, 50]
    )
  })
  
  # Write single JSON file with all teams
  write_json(
    teams_list,
    "nba_elo_ratings.json",
    pretty = TRUE,
    auto_unbox = TRUE
  )
  
  
  # Print progress
  cat(sprintf("Exported row %d to %s\n", i, filename))


cat("Export complete! Files are saved in the 'output_json' directory.\n")
















# Explore the Elo series for one team:
thisteam <- "Lakers"
vals <- e[thisteam, ]
plot(vals, xlab = "Game Index (over this season)",
     ylab = "Elo Score", main = thisteam, type = "l")

summary(xt$eloScore)

xt
xt[order(xt$eloScore, decreasing = TRUE), ]






# Trying out new K factor exponential decrease 

# k <- 20
# x$kfactor <- 0
# for (i in 1:nrow(x)){
#   k <- -(1.00159 ^ i) + 30
#   x$kfactor[i] <- k
# }
# 
# plot(x$gameno, x$kfactor)

# a is the number of games won by a team where the elo score of that team is 
# greater than the other team. 
a <- 0 
x$preWinner <- ""
x$actWinner <- NA
for (i in 1:nrow(x)){
  if (i == 1){
    temph <- e[x$shorthome[i], i]
    tempv <- e[x$shortvis[i], i]
  } else {
    temph <- e[x$shorthome[i], i-1]
    tempv <- e[x$shortvis[i], i-1]
  }
  
  if (temph > tempv){
    x$preWinner[i] <- x$shorthome[i]
  }else if (temph < tempv){
    x$preWinner[i] <- x$shortvis[i]
  }
  
  if (x$gamespread[i] > 0){
    x$actWinner <- x$shorthome[i]
  } else {
    x$actWinner <-x$shortvis[i]
  }
  
  if (x$actWinner[i] == x$preWinner[i]){
    a <- a + 1
  }
  
  if (x$preWinner[i] == ""){
    x$preWinner[i] <- NA
  }
}

# Since this value is the correct prediction based on the basic elo score, the
# value shows that 61% of the time the basic elo score prediction will be 
# correct. I think that the main miss predicted parts are at the end, where the
# playoffs contains strong teams that win/lose often to other teams. 
a/nrow(x)


stop("I am here right now")


# A new exploration for close elo score and historical elo ratings 
# For close elo score games, I will be using the historical data for the teams 
# to predict which team will win this game. 

a <- 0 
x$preWinner <- ""
x$actWinner <- NA
for (i in 1:nrow(x)){
  if (i == 1){
    temph <- e[x$shorthome[i], i]
    tempv <- e[x$shortvis[i], i]
  } else {
    temph <- e[x$shorthome[i], i-1]
    tempv <- e[x$shortvis[i], i-1]
  }
  
  tempdiff <- temph - tempv
  
  if (tempdiff < 30 | tempdiff > -30){
    hish <- 0
    hisv <- 0
    for (j in 1:i){
      # Historical data of the home team 
      hish <- hish + e[x$shorthome[i], j]
      # Historical data of the visitor team
      hisv <- hisv + e[x$shortvis[i], j]
    }
    
    if (hish > hisv){
      x$preWinner[i] <- x$shorthome[i]
    } else {
      x$preWinner[i] <- x$shortvis[i]
    }
    
  } else if (tempdiff > 10){
    x$preWinner[i] <- x$shorthome[i]
  }else if (tempdiff < -10) {
    x$preWinner[i] <- x$shortvis[i]
  }
  
  if (tempdiff > 0){
    x$preWinner[i] <- x$shorthome[i]
  }else if (tempdiff < 0) {
    x$preWinner[i] <- x$shortvis[i]
  }
  
  if (x$gamespread[i] > 1){
    x$actWinner[i] <- x$shorthome[i]
  } else {
    x$actWinner[i] <-x$shortvis[i]
  }
  
  if (x$actWinner[i] == x$preWinner[i]){
    a <- a + 1
  }
  
  if (x$preWinner[i] == ""){
    x$preWinner[i] <- NA
  }
}

a/nrow(x)

mmh <- model.matrix(~ -1 + shorthome, data=x)
mmv <- model.matrix(~ -1 + shortvis, data=x)
mm <- mmh - mmv
colnames(mm) <- gsub("shorthome", "", colnames(mm))
mm.real <- mm[, -1]     
lm.bb.good <- lm(x$gamespread ~ ., data = data.frame(mm.real))
x$jaypred <- predict(lm.bb.good)

# Home court advantage = -9.78 + 1.42 * log(1000 + x$attendance)
x$attendance[is.na(x$attendance)] <- 0
x$logatt <- log(1000 + x$attendance)
mm.real2 <- cbind(mm.real, x$logatt)
colnames(mm.real2)[ncol(mm.real2)] <- "Attendance"
lm.bb.good2 <- lm(x$gamespread ~ ., data = data.frame(mm.real2))
summary(lm.bb.good2)
hist(x$logatt)



x$totalpred <- ""
a <- 0
for (i in 1:nrow(x)){
  if (x$preWinner[i] == x$jaypred[i]){
    x$totalpred[i] <- x$preWinner[i]
  } else if (x$preWinner[i] != x$jaypred[i]){ 
    if(x$jaypred[i] > -4 | x$jaypred[i] < 4){
      x$totalpred[i] <- x$preWinner[i]
    } else if (x$jaypred[i] > 4 | x$jaypred[i] < -4){
      x$totalpred[i] <- x$jaypred[i]
    }
  }
  if ((x$totalpred[i] == x$shorthome[i] && x$gamespread[i] > 0) | 
      (x$totalpred[i] == x$shortvis[i] && x$gamespread[i] < 0) ){
    a <- a + 1
  } 
}

# Improved my prediction by 0.04, better !
a/nrow(x)



# Assuming there are a necessity of 1000 audience to make a difference
adu <- 1000

# There will be an exponential growth of audience to make an point difference so
# I will model this growth with an exponential function. Starting with 1000 
# audience making a difference, the more audience there is, the more audience 
# there is, the higher the score. 

a <- seq(1000,10000,by=0.1)
plot(5*log(8*(a-1000), 2.718))

# a represent the number of audience starting from 1000, and the top number 
# indicates the number of home court advantage points added to the home team.
# Because the spread of the Elo score at the last is about 300, therefore the 
# home team have about 1/6 of the total Elo spread advantage. With this 
# change of Elo score, we will end with a home court advantage ranging from 0 to
# 50 depending on the audience number. 
