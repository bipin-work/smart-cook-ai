// Adds custom matchers like toBeInTheDocument, toHaveClass, toHaveValue, etc.
// Without this, you'd be stuck with bare Jest matchers — these make tests
// read like English ("expect button to be disabled" rather than
// "expect button.disabled to equal true").
import "@testing-library/jest-dom";
