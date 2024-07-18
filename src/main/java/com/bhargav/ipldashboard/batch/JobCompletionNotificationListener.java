package com.bhargav.ipldashboard.batch;

import java.util.HashMap;
import java.util.Map;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.batch.core.BatchStatus;
import org.springframework.batch.core.JobExecution;
import org.springframework.batch.core.listener.JobExecutionListenerSupport;
import org.springframework.stereotype.Component;

import com.bhargav.ipldashboard.model.Team;

@Component
public class JobCompletionNotificationListener extends JobExecutionListenerSupport {

	private static final Logger log = LoggerFactory.getLogger(JobCompletionNotificationListener.class);

	// Constructor to inject EntityManager
	private final EntityManager em;

	public JobCompletionNotificationListener(EntityManager em) {
		this.em = em;
	}

	// This method will be called when the job execution is completed
	@Override
	@Transactional
	public void afterJob(@SuppressWarnings("null") JobExecution jobExecution) {
		// Check if the job completed successfully
		if (jobExecution.getStatus() == BatchStatus.COMPLETED) {
			log.info("!!! JOB FINISHED! Time to verify the results");
			// Create a map to hold team data
			Map<String, Team> teamData = new HashMap<>();

			// Query to count the number of matches played by each team1 and populate the
			// teamData map
			em.createQuery("select m.team1, count(*) from Match m group by m.team1", Object[].class).getResultList()
					.stream().map(e -> new Team((String) e[0], (long) e[1]))
					.forEach(team -> teamData.put(team.getTeamName(), team));

			// Query to count the number of matches played by each team2 and update the
			// teamData map
			em.createQuery("select m.team2, count(*) from Match m group by m.team2", Object[].class).getResultList()
					.stream().forEach(e -> {
						Team team = teamData.get((String) e[0]);
						team.setTotalMatches(team.getTotalMatches() + (long) e[1]);
					});

			// Query to count the number of wins for each team and update the teamData map
			em.createQuery("select m.matchWinner, count(*) from Match m group by m.matchWinner", Object[].class)
					.getResultList().stream().forEach(e -> {
						Team team = teamData.get((String) e[0]);
						if (team != null)
							team.setTotalWins((long) e[1]);
					});

			// Persist each team entity to the database
			teamData.values().forEach(team -> em.persist(team));
			// Persist each team entity to the console
			teamData.values().forEach(team -> System.out.println(team));
		}
	}
}