import React from "react";

const FAQ = () => {
  return (
    <div className="bg-base-200 py-20 md:py-15">
      <div className="max-w-5xl mx-auto px-4">
        
        {/* Heading */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 max-w-2xl mx-auto">
            Find quick answers to common questions from our readers.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">

          {/* Item 1 */}
          <div className="collapse collapse-plus shadow-md rounded-lg">
            <input type="radio" name="faq" defaultChecked />
            <div className="collapse-title text-lg font-medium">
              How long does book delivery take?
            </div>
            <div className="collapse-content">
              <p>
                Delivery usually takes **2–5 business days**, depending on your
                location. You will receive a tracking link after placing your order.
              </p>
            </div>
          </div>

          {/* Item 2 */}
          <div className="collapse collapse-plus shadow-md rounded-lg">
            <input type="radio" name="faq" />
            <div className="collapse-title text-lg font-medium">
              Can I cancel or change my order?
            </div>
            <div className="collapse-content">
              <p>
                Yes! You can cancel or modify your order before it is shipped.
                Visit your dashboard to request changes.
              </p>
            </div>
          </div>

          {/* Item 3 */}
          <div className="collapse collapse-plus shadow-md rounded-lg">
            <input type="radio" name="faq" />
            <div className="collapse-title text-lg font-medium">
              What payment methods do you accept?
            </div>
            <div className="collapse-content">
              <p>
                We accept **Credit/Debit Cards, Mobile Banking, and Cash on
                Delivery** for selected locations.
              </p>
            </div>
          </div>

          {/* Item 4 */}
          <div className="collapse collapse-plus shadow-md rounded-lg">
            <input type="radio" name="faq" />
            <div className="collapse-title text-lg font-medium">
              How do I track my book order?
            </div>
            <div className="collapse-content">
              <p>
                After placing an order, you will receive a tracking ID via email.
                You can check the status anytime.
              </p>
            </div>
          </div>

          {/* Item 5 */}
          <div className="collapse collapse-plus shadow-md rounded-lg">
            <input type="radio" name="faq" />
            <div className="collapse-title text-lg font-medium">
              Can I return a book if I am not satisfied?
            </div>
            <div className="collapse-content">
              <p>
                Absolutely! We offer a **7-day return policy** if the book is in
                its original condition.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default FAQ;
