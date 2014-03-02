angular.module('blogs', ['xml'])
    .config(function ($httpProvider) {
        $httpProvider.interceptors.push('xmlHttpInterceptor');
    });

function BlogsCtrl ($scope, $http) {
    $scope.favTeam = false;
    $scope.teams = [];
    $scope.teamOne = "Red Sox";
    $scope.teamTwo = "Yankees";
    // We must use .then() and not .success()
    $http.get('mlb.xml').then(function (response) {
        var mlbTeams = [],
            teamNames = response.xml.find('team'),
            hitStats = response.xml.find('hitting'),
            pitchStats = response.xml.find('pitching'),
            gameStats = response.xml.find('games'),
            team,
            hits,
            games,
            pitch,
            i;
        for (i = 0; i < teamNames.length; i += 1) {

              team = angular.element(teamNames[i]);
              hits = angular.element(hitStats[i]);
              pitch = angular.element(pitchStats[i]);
              games = angular.element(gameStats[i]);
              mlbTeams.push({
                  name: team.attr('name'),
                  avg: hits.attr('avg'),
                  obp: hits.attr('obp'),
                  ops: hits.attr('ops'),
                  rbi: hits.attr('rbi'),
                  xbh: hits.attr('xbh'),
                  slg: hits.attr('slg'),
                  seca: hits.attr('seca'),
                  era: pitch.attr('era'),
                  wins: games.attr('win'),


             });
                    
        }
        

        $scope.blogs = mlbTeams;
    });

    $scope.compare = function (){
        var firstTeam = $scope.teamOne
        var secondTeam = $scope.teamTwo
        var count = 0;
        for(i=0; i< $scope.teams; i++){
          if($scope.teams[i].name == firstTeam){
            firstTeam = $scope.teams[i];
          }
          if($scope.teams[i].name == teamB){
            secondTeam = $scope.teams[i];
          }
          
        }
        if(parseInt(firstTeam.avg) > parseInt(secondTeam.avg)){
            count += 15;
        }
        if(parseInt(firstTeam.obp) > parseInt(secondTeam.obp)){
            count += 10;
        }
        if(parseInt(firstTeam.ops)>parseInt(secondTeam.ops)){
            count += 5;
        }
        if(parseInt(firstTeam.rbi)>parseInt(secondTeam.rbi)){
            count += 10;
        }
        if(parseInt(firstTeam.xbh)>parseInt(secondTeam.xbh)){
            count += 5;
        }
        if(parseInt(firstTeam.slg)> parseInt(secondTeam.slg)){
            count += 5;
        }
        if(parseInt(firstTeam.seca)> parseInt(secondTeam.seca)){
            count += 5;
        }
        if(parseInt(firstTeam.era) < parseInt(secondTeam.era)){
            count += 15;
        }
        if(parseInt(firstTeam.wins)> parseInt(secondTeam.wins)){
            count += 30;
        }

        $scope.favTeam = true;

        $scope.runCount = count/10;

        var winning = function(count){
            if(count > 0){
                $scope.winningTeam = $scope.teamOne.name;
            }else{
                 $scope.winningTeam = false;
                 $scope.losingTeam = $scope.teamOne.name; 
            }    

    }
    winning(count);
}
}