class profStatModel {
  constructor() {
    // aggregated stats
    this.scoreOverall = 0

    // core stats
    this.professional = 0
    this.expressive = 0
    this.kind = 0
    this.countReview = 0
    this.countGoodReview = 0
    this.countAverageReview = 0
    this.countBadReview = 0

    // secondary stats
    this.countHomework = 0
    this.meanHomework = 0
    this.countAttend = 0
    this.meanAttend = 0
    this.countBirdy = 0
    this.meanBirdy = 0
    this.countExam = 0
    this.meanExam = 0

    // secondary stats
    this.countExamDetails = 0
    this.countExamPrepYes = 0
    this.countExamPrepNo = 0
    this.countExamOpenbookYes = 0
    this.countExamOpenbookNo = 0
    this.countExamOldquestionYes = 0
    this.countExamOldquestionNo = 0
    this.countExamEasymarkYes = 0
    this.countExamEasymarkNo = 0
  }

  updateWithReviews(reviews) {
    reviews.forEach((review) => {
      this.updateWithReview(review)
    })
    this.setAggregatedScores()
  }

  updateWithReview(review) {
    let preCount = this.countReview
    this.countReview++

    // core stats
    this.professional = (this.professional * preCount + review.professional) / this.countReview
    this.expressive = (this.expressive * preCount + review.expressive) / this.countReview
    this.kind = (this.kind * preCount + review.kind) / this.countReview

    const totalScore = review.professional + review.expressive + review.kind
    review.expressive + review.kind
    if (totalScore >= 12) {
        this.countGoodReview++
    } else if (totalScore <= 11 && totalScore >= 8) {
        this.countAverageReview++
    } else if (totalScore <= 7) {
        this.countBadReview++
    }

    // homework
    if (review.rateHomework) {
      this.meanHomework = (this.meanHomework * this.countHomework + review.rateHomework) / (++this.countHomework)
    }
    // attend
    if (review.rateAttend) {
      this.meanAttend = (this.meanAttend * this.countAttend + review.rateAttend) / (++this.countAttend)
    }
    // bird
    if (review.rateBirdy) {
      this.meanBirdy = (this.meanBirdy * this.countBirdy + review.rateBirdy) / (++this.countBirdy)
    }
    // exam
    if (review.rateExam) {
      this.meanExam = (this.meanExam * this.countExam + review.rateExam) / (++this.countExam)
    }

    //exam details
    if (review.hasExam) {
      this.countExamDetails++
    }
    if (review.examprep) {
      this.countExamPrepYes++
    } else if (review.examprep == false) {
      this.countExamPrepNo++
    }
    if (review.openbook) {
      this.countExamOpenbookYes++
    } else if (review.openbook == false) {
      this.countExamOpenbookNo++
    }
    if (review.oldquestion) {
      this.countExamOldquestionYes++
    } else if (review.oldquestion == false) {
      this.countExamOldquestionNo++
    }
    if (review.easymark) {
      this.countExamEasymarkYes++
    } else if (review.easymark == false) {
      this.countExamEasymarkNo++
    }

  }

  setAggregatedScores() {
    this.scoreOverall = RankService.getScoreOverall(this)
  }

  getAggregatedScores() {
    return {
      scoreOverall: this.scoreOverall
    }
  }
}

module.exports = profStatModel
