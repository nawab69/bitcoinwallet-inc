import React from "react";

const accordion = [
  {
    question: "question1",
    answer: "answer1",
  },
  {
    question: "question2",
    answer: "answer2",
  },
  {
    question: "question3",
    answer: "answer3",
  },
  {
    question: "question4",
    answer: "answer4",
  },
];

const Faq = () => {
  return (
    <div style={{ background: "#FFFFFF" }} id="faq">
      <div className="py-4 head text-center">FAQ's</div>
      <div class="accordion container" id="accordionExample">
        <div className="row pb-5">
          {accordion.map((item, index) => {
            return (
              <div className="col-sm-12 col-md-6 mt-2">
                <div class="accordion-item">
                  <h2 class="accordion-header" id="headingThree">
                    <button
                      class="form-control bg-dark text-white text-start collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#collapse${index}`}
                      aria-expanded="false"
                      aria-controls="collapseThree"
                    >
                      {item.question}
                    </button>
                  </h2>
                  <div
                    id={`collapse${index}`}
                    class="accordion-collapse collapse"
                    aria-labelledby="headingThree"
                    data-bs-parent="#accordionExample"
                  >
                    <div class="accordion-body">
                      <strong>{item.answer}</strong>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Faq;
