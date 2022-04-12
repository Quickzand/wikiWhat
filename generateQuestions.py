from whapi import random_article, return_details, get_images
import json 


def questionBuilder():
    article = random_article()
    try:
        articleImages = get_images(article)
    except:
        print("Error getting images, trying again")
        return None
    # if article contains "https://www.wikihow.com/images/7/78/Incomplete_856.gif" then return questionBuilder()
    if "https://www.wikihow.com/images/7/78/Incomplete_856.gif" in articleImages:
        return questionBuilder()
    if len(articleImages) < 4:
        return questionBuilder()
    articleData = return_details(article)
    answer = articleData['title']
    images = []
    # puts 3 random images from the article into the images array
    for i in range(3):
        images.append(articleImages[i])

    incorrectAnswers = []
    # Gets 5 random titles of articles
    for i in range(5):
        article = random_article()
        articleData = return_details(article)
        incorrectAnswers.append(articleData['title'])

    question = {
        "answer": answer,
        "hints": images,
        "incorrectAnswers": incorrectAnswers
    }
    return question


# generates a list of 100 questions
def generateQuestions(numOfQuestions):
    questions = []
    for i in range(numOfQuestions):
        print("Constructing question #" + str(i));
        newQuestion = questionBuilder()
        if newQuestion == None:
            continue
        questions.append(newQuestion)
    with open("questions.json", "w") as outfile:
        json.dump(questions, outfile)






generateQuestions(500)