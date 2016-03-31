document.addEventListener("deviceready", onDeviceReady, false);

	// Creer Base de données
	function onDeviceReady() {
		
		alert('Chargement OK');

		var db = window.sqlitePlugin.openDatabase({name: "AndroidUser"});
		var stmt_create_table='CREATE TABLE IF NOT EXISTS tbl_user'+
		'(id INTEGER PRIMARY KEY, identifiant TEXT, password TEXT, nom TEXT, prenom TEXT, age INTEGER)';

		db.transaction(function(transaction) {
			transaction.executeSql(stmt_create_table, [],

				function(tx, result) {
					alert("Table OK");
				},

				function(error) {
					alert("Pb de création de la BDD "+ error.message);
				})
		});

		BtnLogin(db);

		BtnAjouter(db);

		PageListe(db);

		PageListeReload(db);

		BtnSupprimer(db);

		BtnDeconnexion();

	}

	function BtnDeconnexion() {
		$("#btnDeconnexion").on("click", function(){
			$( this ).removeClass( "login" );
       		$( this ).addClass( "logout" );
       		$.mobile.pageContainer.pagecontainer("change", "#page1");
		});
	}

	function BtnLogin(db) {
		$("#btnLogin").on("click", function(){
		//alert("Click Ok");
		
		var loginUser=$("#loginSignIn").val();
		var pwdUser=$("#pwdSignIn").val();

		//test si data saisie
		if ((loginUser == '') && (pwdUser == '')) {
			alert('Login non saisi');
		}

		//test si login valide
		if ((loginUser != '') && (pwdUser != ''))
		{
			//alert("Data non vide");
			db.transaction(function(transaction) {
				var executeQuery ="SELECT * FROM tbl_user WHERE identifiant=?";
					transaction.executeSql(executeQuery, [loginUser],
						function (tx, results) {
							var len = results.rows.length, i;
							$("#rowCount").append(len);
							for (i = 0; i < len; i++){
								$("#tableLogin").append("<tr><td>"+results.rows.item(i).identifiant+"</td><td>"+results.rows.item(i).password+"</td></tr>");
								//alert(results.rows.item(i).identifiant);
								//alert(results.rows.item(i).password);
							}

								if((loginUser === results.rows.item(0).identifiant) && (pwdUser === results.rows.item(0).password))
								{
								//si login valide
								alert("Login OK");
								//$("#page4").pagecontainer( "load" );
								$.mobile.pageContainer.pagecontainer("change", "#page4");
								} else {
								//si login invalide
								alert('Pb de Connexion');
								}
						}, null);
			});
		};
	});
}


function BtnSupprimer(db) {
	$("#btnSupprimer").on("click", function(){
				//On recupere Input
				var id_user=$("#idBdd").val();

				alert("ID: "+id_user);

				if ((id_user != ''))
				{
					db.transaction(function(transaction) {
						var executeQuery = "DELETE FROM tbl_user where id=?";
						transaction.executeSql(executeQuery, [id_user],
					//On Success
					function(tx, result) {
						alert('Suppresion OK');
					},
					//On Error
					function(error){
						alert('Pb durant Suppresion');
					});
					});

				} else {
					alert('Champs Vides');
				}

				$("#TableData").empty();
				db.transaction(function(transaction) {
					transaction.executeSql('SELECT * FROM tbl_user', [], function (tx, results) {
						var len = results.rows.length, i;
						$("#rowCount").append(len);
						for (i = 0; i < len; i++){
							$("#TableData").append("<tr><td>"+results.rows.item(i).id+"</td><td>"+results.rows.item(i).nom+"</td><td>"+results.rows.item(i).prenom+"</td></tr>");
						}
					}, null);
				});
				effacerId();
			});
}

function PageListe(db) {
	$("#pageListe").on("click", function(){
		$("#TableData").empty();
		db.transaction(function(transaction) {
			transaction.executeSql('SELECT * FROM tbl_user', [], function (tx, results) {
				var len = results.rows.length, i;
				$("#rowCount").append(len);
				for (i = 0; i < len; i++){
					$("#TableData").append("<tr><td>"+results.rows.item(i).id+"</td><td>"+results.rows.item(i).nom+"</td><td>"+results.rows.item(i).prenom+"</td></tr>");
				}
			}, null);
		});
	});
}

function PageListeReload(db) {
	$("#pageListeReload").on("click", function(){
		$("#TableData").empty();
		db.transaction(function(transaction) {
			transaction.executeSql('SELECT * FROM tbl_user', [], function (tx, results) {
				var len = results.rows.length, i;
				$("#rowCount").append(len);
				for (i = 0; i < len; i++){
					$("#TableData").append("<tr><td>"+results.rows.item(i).id+"</td><td>"+results.rows.item(i).nom+"</td><td>"+results.rows.item(i).prenom+"</td></tr>");
				}
			}, null);
		});
	});
}

function BtnAjouter(db) {
	$("#btnAjouter").on("click", function(){
				//On recupere Input
				var nom_user=$("#nom").val();
				var prenom_user=$("#prenom").val();
				var age_user=$("#age").val();
				var login_user=$("#login").val();
				var pwd_user=$("#password").val();

				if ((nom_user != '') || (prenom_user != '') || (age_user != '') || (login_user != '') || (pwd_user != ''))
				{
					db.transaction(function(transaction) {
						var executeQuery = "INSERT INTO tbl_user (identifiant, password, nom, prenom, age) VALUES (?, ?, ?, ?, ?)";
						transaction.executeSql(executeQuery, [login_user, pwd_user, pwd_user, pwd_user, age_user],

							function(tx, result) {
								alert('Insertion OK');
							},

							function(error){
								alert('Pb durant Insertion');
							})
					});

				} else {
					alert('Champs Vides');
				}
		effacerAjout();
			});
}

function effacerAjout() {
  $(':input','#formulaire')
   .not(':button, :submit, :reset, :hidden')
   .val('')
   .removeAttr('checked')
   .removeAttr('selected');
}

function effacerId() {
  $(':input','#formulaireSuppression')
   .not(':button, :submit, :reset, :hidden')
   .val('')
   .removeAttr('checked')
   .removeAttr('selected');
}