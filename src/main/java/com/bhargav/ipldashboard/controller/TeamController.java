package com.bhargav.ipldashboard.controller;

import java.time.LocalDate;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

//import org.springframework.boot.autoconfigure.data.web.SpringDataWebProperties.Sort;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.bhargav.ipldashboard.model.Match;
import com.bhargav.ipldashboard.model.Team;
import com.bhargav.ipldashboard.service.MatchRepository;
import com.bhargav.ipldashboard.service.TeamRepository;

@RestController
@CrossOrigin
public class TeamController {

    private TeamRepository teamRepository;
    private MatchRepository matchRepository;
    
    public TeamController(TeamRepository teamRepository, MatchRepository matchRepository) {
        this.teamRepository = teamRepository;
        this.matchRepository = matchRepository;
    }


    @GetMapping("/team")
    public Iterable<Team> getAllTeam() {
        List<Team> teams = teamRepository.findAll();
        Collections.sort(teams, Comparator.comparing(Team::getTeamName));
        return teams;
    }

    @GetMapping("/team/{teamName}")
    public Team getTeam(@PathVariable String teamName) {
        Team team = this.teamRepository.findByTeamName(teamName);
        team.setMatches(matchRepository.findLatestMatchesbyTeam(teamName,4));
            
        return team;
    }

    @GetMapping("/team/{teamName}/matches")
    public List<Match> getMatchesForTeam(@PathVariable String teamName, @RequestParam int year) {
        LocalDate startDate = LocalDate.of(year, 1, 1);
        LocalDate endDate = LocalDate.of(year + 1, 1, 1);
        return this.matchRepository.getMatchesByTeamBetweenDates(
            teamName,
            startDate,
            endDate
            );
    }

}    
