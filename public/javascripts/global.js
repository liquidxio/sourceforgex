// Userlist data array for filling in info box
var userListData = [];

// DOM Ready =============================================================
$(document).ready(function() {

    // Populate the user table on initial page load
    populateTable();

    // Username link click
    $('#userList table tbody').on('click', 'td a.linkshowuser', showUserInfo);

    // Add User button click
    $('#btnAddUser').on('click', addUser);    

    // Delete User link click
    $('#userList table tbody').on('click', 'td a.linkdeleteuser', deleteUser);

});

// Functions =============================================================

// Fill table with data
function populateTable() {
	
	
    // Empty content string
    var tableContent = '';

    // jQuery AJAX call for JSON
    $.getJSON( '/users/userlist', function( data ) {

        // Populate the global variable userListData with the data retrieved from MongoDB
        userListData = data;

        // For each item in our JSON, add a table row and cells to the content string
        $.each(data, function(){
            tableContent += '<tr>';
            tableContent += '<td><a href="#" class="linkshowuser" rel="' + this.developers[0].username + '" title="Show Details">' + this.developers[0].username + '</a></td>';
            tableContent += '<td>' + this.developers[0].name + '</td>';
            tableContent += '<td><a href="#" class="linkdeleteuser" rel="' + this._id + '">delete</a></td>';
            tableContent += '</tr>';
        });
        
        // Inject the whole content string into our existing HTML table
        $('#userList table tbody').html(tableContent);
        
        
    });
    
};

// Show User Info
function showUserInfo(event) {

    // Prevent Link from Firing
    event.preventDefault();

    // Retrieve username from link rel attribute
    var thisUserName = $(this).attr('rel');

    // Get Index of object based on id value
    var arrayPosition = userListData.map(function(arrayItem) { return arrayItem.developers[0].username; }).indexOf(thisUserName);

    // Get our User Object
    var thisUserObject = userListData[arrayPosition];    
    /*
    //Clear Info Box
    $('#userInfoName').val('');
    $('#userInfoStatus').val('');
    $('#userInfoPrefferedSupportTool').val('');
    $('#userInfoProfileURL').val('');
    $('#userInfoPrefferedSupportURL').val('');
    $('#userInfoLabels').val('');
    $('#userInfoPrivate').val('');
    $('#userInfoPublicCreationDate').val('');
    $('#userInfoSocialNetworks').val('');
    $('#userInfoTools').val('');
    $('#userInfoCategories').val('');
    $('#userInfoIconURL').val('');
    $('#userInfoVideoURL').val('');
    $('#userInfoScreenShots').val('');
    $('#userInfoSummary').val('');
    $('#userInfoShortDescription').val('');
    $('#userInfoMovedToURL').val('');
    $('#userInfoExternalHomepage').val('');
    */
    /*
    $('#userInfoStarredURL').val('');
    $('#userInfoSubscriptionsURL').val('');
    $('#userInfoOrganizationsURL').val('');
    $('#userInfoReposURL').val('');
    $('#userInfoEventsURL').val('');
    $('#userInfoReceivedEvents').val('');
    $('#userInfoLogin').val('');
    $('#userInfoID').val('');
    $('#userInfoType').val('');
    $('#userInfoSiteAdmin').val('');
    $('#userInfoCreated').val('');
    $('#userInfoUpdated').val('');
    */
    
    //Populate Info Box
    $('#userInfoName').text(thisUserObject.developers[0].name);
    $('#userInfoStatus').text(thisUserObject.status);
    $('#userInfoPrefferedSupportTool').text(thisUserObject.preferred_support_tool);
    $('#userInfoProfileURL').text(thisUserObject.profile_api_url);
    $('#userInfoPrefferedSupportURL').text(thisUserObject.preferred_support_url);
    $('#userInfoLabels').text(thisUserObject.labels);
    $('#userInfoPrivate').text(thisUserObject.private);    
    $('#userInfoCreationDate').text(thisUserObject.creation_date);
    $('#userInfoSocialNetworks').text(thisUserObject.socialnetworks);    
    $('#userInfoTools').text(JSON.stringify(thisUserObject.tools));
    //var string = '';
    //for (i in thisUserObject.tools) {
    	//string += 'Mount Point: ' + thisUserObject.tools[i].mount_point + "\n";
    	//string += ' Name: ' + thisUserObject.tools[i].name;
    	//string += ' Label: ' + thisUserObject.tools[i].label + '\n';
    	//}
    //$('#userInfoTools').text(string);
    //$('#toolsMountPoint').text(thisUserObject.tools[0].mount_point);
    $('#userInfoCategories').text(JSON.stringify(thisUserObject.categories));
    $('#userInfoIconURL').text(thisUserObject.icon_url);
    $('#userInfoVideoURL').text(thisUserObject.video_url);
    $('#userInfoScreenShots').text(thisUserObject.screenshots);
    $('#userInfoSummary').text(thisUserObject.summary);
    $('#userInfoShortDescription').text(thisUserObject.short_description);
    $('#userInfoMovedToURL').text(thisUserObject.moved_to_url);
    $('#userInfoExternalHomepage').text(thisUserObject.external_homepage);
    /*
    $('#userInfoStarredURL').text(thisUserObject.starred_url);
    $('#userInfoSubscriptionsURL').text(thisUserObject.subscriptions_url);
    $('#userInfoOrganizationsURL').text(thisUserObject.organizations_url);
    $('#userInfoReposURL').text(thisUserObject.repos_url);
    $('#userInfoEventsURL').text(thisUserObject.events_url);
    $('#userInfoReceivedEvents').text(thisUserObject.received_events_url);
    $('#userInfoLogin').text(thisUserObject.login);
    $('#userInfoID').text(thisUserObject.id);
    $('#userInfoType').text(thisUserObject.type);
    $('#userInfoSiteAdmin').text(thisUserObject.site_admin);
    $('#userInfoCreated').text(thisUserObject.created_at);
    $('#userInfoUpdated').text(thisUserObject.updated_at);
    */
};

// Add User
function addUser(event) {
    event.preventDefault();

    // Super basic validation - increase errorCount variable if any fields are blank
    var errorCount = 0;
    $('#addUser fieldset #inputUserName').each(function(index, val) {
        if($(this).val() === '') { errorCount++; }
    });
    $('#addUser fieldset #inputUserEmail').each(function(index, val) {
        if($(this).val() === '') { errorCount++; }
    });

    //////////alert($('#addUser fieldset #inputUserEmail'));
    
    // Check and make sure errorCount's still at zero or 1
    if(errorCount === 0 || errorCount === 1) {

        // If it is, compile search parameters into one object
        var newUser = {
            'username': $('#addUser fieldset input#inputUserName').val(),
            'email': $('#addUser fieldset input#inputUserEmail').val()
        }
        
        // Use AJAX to post the object to our adduser service
        $.ajax({
            type: 'POST',
            data: newUser,
            url: '/users/adduser',
            dataType: 'JSON'
        }).done(function( response ) {
        	
        	
            // Check for successful (blank) response
            if (response.msg == '') {

                // Clear the form inputs
                $('#addUser fieldset input').val('');

                // Update the table
                populateTable();     
                location.reload();
            }
            else {
            	// Clear the form inputs
                $('#addUser fieldset input').val('');

                // Update the table
                populateTable();
                // If something goes wrong, alert the error message that our service returned
                alert('Error: ' + 'someting wong' + response.msg);

            }
        });
    }
    else {
        // If errorCount is more than 0, error out
        alert('Please specify a username or email to look up');
        return false;
    }
};

// Delete User
function deleteUser(event) {

    event.preventDefault();

    // Pop up a confirmation dialog
    var confirmation = confirm('Are you sure you want to delete this user?');

    // Check and make sure the user confirmed
    if (confirmation === true) {

        // If they did, do our delete
        $.ajax({
            type: 'DELETE',
            url: '/users/deleteuser/' + $(this).attr('rel')
        }).done(function( response ) {

            // Check for a successful (blank) response
            if (response.msg === '') {
            }
            else {
                alert('Error: ' + response.msg);
            }

            // Update the table
            populateTable();
            //location.reload();
        });

    }
    else {

        // If they said no to the confirm, do nothing
        return false;

    }

};