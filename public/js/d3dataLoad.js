

//==============  Loads the list of API connections within the index page
function loadData(data){


	var data = JSON.parse(data);	
		
	var columns = ['text', 'distance', 'duration'];

	d3.select("#tbl-sources").remove();
	var table = d3.select('#sources').append('table').attr("id","tbl-sources");
	var thead = table.append('thead');
	var	tbody = table.append('tbody');

	// append the header row
	thead.append('tr')
	.selectAll('th')
	.data(columns).enter()
	.append('th')
	.text(function (column) 
		{ 
			return column;			
		})
	.attr('class', function (column) 
		{
			console.log(column);
			if(column == 'text'){return 'th-text'; }
			else if(column == 'distance'){return 'th-distance'; }
			else if(column == 'duration'){return 'th-duration'; }
		});

	// create a row for each object in the data
	var rows = tbody.selectAll('tr')
	.data(data)
	.enter()
	.append('tr');	
	
	// create a cell in each row for each column
	var cells = rows.selectAll('td')
		  .data(function (row) {
				return columns.map(function (column) {	       
				return {column: column, value: row[column]};
		    });
		  })
	.enter()
	.append('td')
	.text(function (d) { 
				return d.value;		
		})
	.attr('class', function (column) 
		{						
			if(column['column'] == 'text'){return 'td-text'; }
			else if(column['column'] == 'distance'){return 'td-distance'; }
			else if(column['column'] == 'duration'){return 'td-duration'; }
		});
	
}	
	

			
