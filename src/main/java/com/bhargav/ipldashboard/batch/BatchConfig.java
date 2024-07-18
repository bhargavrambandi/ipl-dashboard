package com.bhargav.ipldashboard.batch;

import javax.sql.DataSource;

import org.springframework.batch.core.Job;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.configuration.annotation.EnableBatchProcessing;
import org.springframework.batch.core.configuration.annotation.JobBuilderFactory;
import org.springframework.batch.core.configuration.annotation.StepBuilderFactory;
import org.springframework.batch.core.launch.support.RunIdIncrementer;
import org.springframework.batch.item.database.BeanPropertyItemSqlParameterSourceProvider;
import org.springframework.batch.item.database.JdbcBatchItemWriter;
import org.springframework.batch.item.database.builder.JdbcBatchItemWriterBuilder;
import org.springframework.batch.item.file.FlatFileItemReader;
import org.springframework.batch.item.file.builder.FlatFileItemReaderBuilder;
import org.springframework.batch.item.file.mapping.BeanWrapperFieldSetMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;

import com.bhargav.ipldashboard.model.Match;

@Configuration
@EnableBatchProcessing
public class BatchConfig {

	// Define the field names that correspond to columns in the CSV file
	private final String[] FIELD_NAMES = new String[] { "id", "city", "date", "player_of_match", "venue",
			"neutral_venue", "team1", "team2", "toss_winner", "toss_decision", "winner", "result", "result_margin",
			"eliminator", "method", "umpire1", "umpire2" };

	// Autowire the JobBuilderFactory to create jobs
	@Autowired
	public JobBuilderFactory jobBuilderFactory;

	// Autowire the StepBuilderFactory to create steps
	@Autowired
	public StepBuilderFactory stepBuilderFactory;

	// Define a FlatFileItemReader bean to read data from the CSV file
	@Bean
	public FlatFileItemReader<MatchInput> reader() {
		return new FlatFileItemReaderBuilder<MatchInput>().name("MatchItemReader")
				.resource(new ClassPathResource("match-data.csv")) // Specify the CSV file location
				.delimited().names(FIELD_NAMES) // Map the fields to the column names
				.fieldSetMapper(new BeanWrapperFieldSetMapper<MatchInput>() {
					{
						setTargetType(MatchInput.class); // Set the target type to MatchInput
					}
				}).build();
	}

	// Define a processor bean to process the data read from the CSV file
	@Bean
	public MatchDataProcessor processor() {
		return new MatchDataProcessor();
	}

	// Define a JdbcBatchItemWriter bean to write data to the database
	@Bean
	public JdbcBatchItemWriter<Match> writer(DataSource dataSource) {
		return new JdbcBatchItemWriterBuilder<Match>()
				.itemSqlParameterSourceProvider(new BeanPropertyItemSqlParameterSourceProvider<>())
				.sql("INSERT INTO match (id, city, date, player_of_match, venue, team1, team2, toss_winner, toss_decision, match_winner, result, result_margin, umpire1, umpire2) "
						+ " VALUES (:id, :city, :date, :playerOfMatch, :venue, :team1, :team2, :tossWinner, :tossDecision, :matchWinner, :result, :resultMargin, :umpire1, :umpire2)")
				.dataSource(dataSource).build();
	}

	// Define a Job bean to encapsulate the entire batch job
	@Bean
	public Job importUserJob(JobCompletionNotificationListener listener, Step step1) {
		return jobBuilderFactory.get("importUserJob").incrementer(new RunIdIncrementer()) // Incrementer to handle job
																							// restarts
				.listener(listener) // Add a job listener for notification upon completion
				.flow(step1) // Define the flow of the job starting with step1
				.end().build();
	}

	// Define a Step bean to encapsulate a step in the batch job
	@Bean
	public Step step1(JdbcBatchItemWriter<Match> writer) {
		return stepBuilderFactory.get("step1").<MatchInput, Match>chunk(10) // Define the chunk size for processing
				.reader(reader()) // Set the reader to read data from the CSV file
				.processor(processor()) // Set the processor to process the data
				.writer(writer) // Set the writer to write data to the database
				.build();
	}
}
