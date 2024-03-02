                                                                                                                                                                         בס"ד
React Project - 3/3/2024
Name: Alon Ben Porat
Phone: 0542744442
Class: Simon
School: Hackeru
_________________________________________________________________________________
Project Description: Web System for Item Management
In this project, I needed to create a web system for managing items on the server-side. 
Below is a detailed description of all the system elements and functionalities.



						All pages have a navbar with themes of dark or light.
			Most of the important design shared among components is in cards.css in the style folder.
1.Home Page:
Provides a user interface for browsing and interacting with a list of items, including searching, liking, and viewing details of individual items.

•State Management: 
	Manages state variables using the useState hook, including items (to store the fetched items), searchQuery (for filtering items based on user input), and totalLikes 	(to track the total number of likes across all items).

•Fetching Items: 
	Retrieves items from the server using an asynchronous function fetchItems, which sends a GET request to the specified API endpoint. Upon receiving the response, it 	updates the items state and calculates the totalLikes.

•Handling Likes: 
	The component provides a function handleLike to toggle the like status of an item. It updates the likes array of the item and sends a PATCH request to the server to 	update the like status persistently. It also updates the items state to reflect the changes.
•Map Items: 
	Each item has a sign with the number of user likes according to the array length.
	Minimized Item Details: Initially, items have minimized details. Clicking on the image will open a zoom-in view with all card item details. Provides navigation 	buttons to go to the previous, next, or close the current item. These buttons trigger corresponding functions (handleBackItem, handleNextItem, handleGoBack), which 	update the selected item based on the current index.
•Rendering: 
Renders a list of items based on the items state, filtered by the searchQuery. Each item is displayed as a card with its title, subtitle, website link, image, and address details.




2.Register Page:

	Provides a user-friendly interface for user registration with features such as dynamic form handling, error feedback, and admin access control in a modal display.
•Form Fields: 
	Inside the modal, users can input various details required for registration, such as name, phone, email, password, address details, and an option to indicate whether 	they are a business user or an admin.
•Form Submission: 
	Upon filling out the form and submitting it, the component sends a POST request to the server with the provided user data. If successful, the user receives a success 	message, and the form is reset. If there are any errors during registration (e.g., validation errors or server errors), appropriate error messages are displayed to 	the user based on server response.
•Dynamic Form Fields: 
	The component dynamically updates the state (formData) based on user input using event handlers (handleInputChange, handleNameChange, handleAddressChange). This 	ensures that the form data reflects the user's input accurately.
•Checkbox Handling: 
	The component includes checkboxes for indicating whether the user is a business user or an admin user. These checkboxes update the formData state accordingly.
•Admin Access: 
	If the logged-in user is an admin, an additional checkbox for marking a user as an admin is displayed. This allows admins to register new admin users.
•Alert Display: 
	Upon successful registration, a success message is displayed to the user via an alert banner (alertShow). This alert disappears after a few seconds.
•Modal Control: 
	The modal can be closed by clicking the close button or outside the modal area. Additionally, users can navigate away from the registration process by clicking the 	"Go Back" button.



3.About Page:
	Communicates the purpose of the website and provides relevant information to users interested in exploring Spain or contributing business cards. 
	Provides a Google Maps embed displaying the location of the business. Using communication components for purposes like:
•Email: 
	Represents the email address to which users can send an email.
•WhatsApp: 
	Represents the WhatsApp number to which users can send a message.
•Phone: 
	Represents the phone number users can call.


4.Sitemap:

	Guides users to the various pages, features, and functionalities available on the website.
	Summary of Elements, Snippets, and Functionality of the System.


5.Navigation bar 
	The navigation bar of the web system provides a user-friendly navigation experience with various options based on the user's authentication status and role. It also 	supports theme toggling and integrates modal components for user authentication and profile editing and can navigate to users and items management page.

	• Manages state variables such as isLoggedIn, isBusiness, isAdmin, and activeDropdownItem using the useState hook.
	• The dropdown menu displays different navigation options based on the user's authentication status (isLoggedIn), role (isBusiness, isAdmin), and active dropdown 	  							item.
	• Uses useEffect to update state variables based on local storage values and user data changes. 
	• handleLoginSuccess sets the isLoggedIn state to true upon successful user login. 
	  	The Login component provides interface for logging into the application, handles login attempts, and displays relevant alerts based on the login outcome, 		saved responses from the server to use in different locations in the system. 
	• handleLogout clears local storage and resets state variables upon user logout. 
	• HandleEditUserDetails opens the modal for editing user details. 
	  	The user login is initialized in the form for an easy way to edit.  
	• The "Add Items" component provides a comprehensive interface for managing card items on the site, including adding new cards, editing existing ones, and performing 	 	CRUD operations. It provides a form for adding or editing card details, handles input change events, and updates the form data accordingly. It allows users to 		select an image for the card from a dropdown list sorted alphabetically. Validates form submission and displays success or failure messages accordingly. 		Resets the form after successful submission or when switching between add and edit modes. Renders cards for existing items fetched from the server and 			displays success or failure alerts based on user actions.
	• My favorite is the "Likes" component, which provides a user-friendly interface for viewing and managing liked items, including search functionality and the ability 		to unlike items. It handles Like and Unlike operations, provides functionality to unlike an item when the user clicks on the trash icon, updates the liked 		items list accordingly after unlike operation, renders the total number of likes at the top of the page, provides a search box for filtering items based on 		their title, subtitle, or address, displays the filtered liked items as cards, and allows users to click on a card to view more details.
	• Mycards is responsible for displaying cards belonging to the current login user, allowing them to view, like, and interact with their own cards, including viewing, 		liking, and searching for specific cards. It provides functionality to toggle between table view and card view using the isTableView state variable, renders 		different UI components based on the selected view mode, fetches the user's cards from the API when the component mounts, filters the cards based on the 		current user ID and updates the items state with the user ID from local storage, renders the total number of items and total likes, allows the user to zoom in 		to a card to get more details on the card UI, and restricts the amount of chart on description for table view for better readability.


6.Management tools and protection:
	manage access control determine whether a user is authorized to access certain routes based on their login status and role (isAdmin and isBusiness).

	A. 
		• Protection logic, 
			based on the provided isAdmin and isBusiness props that were saved to local storage in the login stage, decides whether the user has the 				necessary roles to access the protected routes. 
			If the user has both admin and business roles, or if they have either admin or business role(but not both),
			it allows access to the protected routes by returning the children. If the user does not have the required roles, it redirects them to the login page.
		• "AddItems," "UsersTable," and "ItemTable" components are protected based on user role user can access.
	B.	
	Users Table:
		This component provides comprehensive functionality for managing user data, including sorting, filtering, editing, and deleting users. 
		It also offers options for exporting data and interacting with the user interface. 
			• sorts user data based on various fields such as name, phone, email, address, isAdmin, createdAt, and isBusiness. 
			  Sorting direction (ascending or descending) is toggled accordingly, filters the users based on the search query entered by the user.
			• provides options to export user data as CSV or PDF files, and to print the user table.
			• allows toggling the business status of users by clicking on a checkbox in the table. 
			• deletes users from the system by clicking on a delete icon in the table, displays a confirmation dialog before deleting the user.
			• totals the amount  number of users, admins, and business users based on the users array.

	C.	
	Items Table:
		the component offers comprehensive functionality for managing item data, 
		including sorting, filtering, editing, and deleting items. 
		It also provides options for exporting data and interacting with the user interface.
			• filters the items based on the search query entered by the user, sorts item data based
 				on various fields such as title, subtitle, web, email, address, likes, etc. 
			• deletes items from the server, by clicking on the trash icon in the table, displays a confirmation dialog before deleting the item.
			• provides options to export item data as CSV or PDF files, and to print the item table. 
			• allows the user to filter items based on their creation date within the last day, week, 15 days, 30 days, 60 days, 90 days, or 120 days.
			• provides additional information about the item when the user hovers over the corresponding table cell, 
					enhancing the user experience by showing which user has liked the item based on user Id.


