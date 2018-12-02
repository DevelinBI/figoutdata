

//==============  Loads the list of API connections within the index page
function loadData(data){

	var data = data.replace(/'/gi, '');
	console.log(data);
	var data = JSON.parse(data);	
		
	var columns = ['source', 'title', 'description', 'url', 'source type'];

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
			if(column == 'source'){return 'th-source';}
			else if(column == 'title'){return 'th-title';}
			else if(column == 'description'){return 'th-description';}
			else if(column == 'url'){return 'th-url';}
			else if(column == 'source type'){return 'th-sourcetype';}	
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
		      
			  if(column == 'source'){var columnOrig = 'site' }
			  else if(column == 'description'){var columnOrig = 'text' }
			  else if(column == 'source type'){var columnOrig = 'site_type' }
			  else {columnOrig = column}
			  
			  return {column: column, value: row[columnOrig]};
		    });
		  })
	.enter()
	.append('td')
	.text(function (d) { 
		

				return d.value; 
			
		
		})
	.attr('id', function (d) 
		{ 			
	
		})
	
	//Set the classes for each column
	.attr('class', function (d) 
		{							
						
			if(d.column == 'source'){return 'td-source';}
			else if(d.column == 'title'){return 'td-title';}
			else if(d.column == 'description'){return 'td-description';}
			else if(d.column == 'url'){return 'td-url';}
			else if(d.column == 'source type'){return 'td-sourcetype';}	 
	
		})
	.on("click", function(d) 
		{
			
				
		});
	
}	
	

			
