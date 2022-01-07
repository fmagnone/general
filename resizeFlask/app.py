import os

#from cs50 import SQL
from flask import Flask, flash, jsonify, redirect, render_template, request, session

# Configure application
app = Flask(__name__)

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
def index():
    if request.method == "POST":
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
        # Display the entries in the database on index.html
        """
        BIRTHDAYS = db.execute("SELECT * FROM birthdays")
        return render_template("index.html", birthdays=BIRTHDAYS)
        """
        return render_template("index.html")
