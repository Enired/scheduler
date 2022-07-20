import React from "react";

import { render, cleanup, waitForElement, prettyDOM, getByText, getAllByTestId, fireEvent, getByPlaceholderText, getByAltText, getByTestId, debugDOM, queryByText} from "@testing-library/react";

import Application from "components/Application";


afterEach(cleanup);

describe('Application', ()=>{
  xit("renders without crashing", () => {
    render(<Application />);
  });

  it("defaults to Monday and changes the schedule when a new day is selected", ()=>{
    const {getByText} = render(<Application/>);

    return waitForElement(()=>getByText('Monday'))
  })

  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async ()=>{
    const {container, debug} = render(<Application/>)
    await waitForElement(()=> getByText(container, "Archie Cohen"))
    const appointments =  getAllByTestId(container, "appointment")
    const appointment = appointments[0]


    fireEvent.click(getByAltText(appointment, 'Add'))
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i),{
      target: {value:"Lydia Miller-Jones"}
    })

    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"))

    fireEvent.click(getByText(appointment, "Save"))

    expect(getByText(appointment, 'SAVING')).toBeInTheDocument()

    await waitForElement(()=>getByText(appointment, 'Lydia Miller-Jones'))

    expect(getByText(appointment, 'Lydia Miller-Jones')).toBeInTheDocument()

    const day = getAllByTestId(container, 'day').find(day=>queryByText(day, "Monday"))

    expect(getByText(day, 'no spots remaining')).toBeInTheDocument()

  })

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
  
    const { container } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"));
    const appointments =  getAllByTestId(container, "appointment")
    const appointment = appointments[1]

  
    fireEvent.click(getByAltText(appointment, "Delete"));

    expect(getByText(appointment, /are you sure you want to delete this?/i))

    fireEvent.click(getByText(appointment, 'Confirm'))

    expect(getByText(appointment, 'DELETING')).toBeInTheDocument()

    await waitForElement(()=> getByAltText(appointment, "Add"))

    const day = getAllByTestId(container, 'day').find(day=>queryByText(day, "Monday"))

    expect(getByText(day, '2 spots remaining')).toBeInTheDocument()
  });

  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async() => {
    const { container } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"));
    const appointments =  getAllByTestId(container, "appointment")
    const appointment = appointments[1]

    fireEvent.click(getByAltText(appointment, 'Edit'))

    // expect(getByText(appointment, "Archie Cohen")).toBeInTheDocument()

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {target: {value: 'Derine Banis'}})

    fireEvent.click(getByAltText(appointment, 'Sylvia Palmer'))

    // expect(getByTestId(appointment, "student-name-input")).not.toBeInTheDocument()

    





  })



})


