import os

#from cs50 import SQL
from flask import Flask, flash, jsonify, redirect, render_template, request, session
from flask_cors import CORS, cross_origin

# Configure application
app = Flask(__name__)
CORS(app, support_credentials=True)

# Ensure templates are auto-reloaded
app.config["TEMPLATES_AUTO_RELOAD"] = True


@app.after_request
def after_request(response):
    """Ensure responses aren't cached"""
    response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    response.headers["Expires"] = 0
    response.headers["Pragma"] = "no-cache"
    return response


@app.route("/", methods=["GET", "POST"])
@cross_origin(supports_credentials=True)
def index():
    if request.method == "POST":
        # POST method
        """
        # Add the user's entry into the database

        # Validate name
        name = request.form.get("name")
        month = request.form.get("month")
        day = request.form.get("day")
        if not name:
            return render_template("error.html", message="Missing name")
        if not month:
            return render_template("error.html", message="Missing month")
        if not day:
            return render_template("error.html", message="Missing day")

        # Remember registrant
        db.execute("INSERT INTO birthdays (name, month, day) VALUES(?, ?, ?)", name, month, day)
        """
        return redirect("/")

    else:
        # GET method
        """
        BIRTHDAYS = db.execute("SELECT * FROM birthdays")
        return render_template("index.html", birthdays=BIRTHDAYS)
        """
        #return render_template('layout.html', title="Python Title", description="Python custom description.")
        print("Render Layout")
        return render_template('index.html')






@app.route("/contact")
def contact_page():
    return render_template('contact.html')