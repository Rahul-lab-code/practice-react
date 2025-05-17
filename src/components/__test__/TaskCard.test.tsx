import { render, screen } from "@testing-library/react"
import { TaskCard } from "../TaskCard"
import '@testing-library/jest-dom';

describe("Testing TaskCard Functionality",()=>{
    it("Sending all the details", async () => {
        render(<TaskCard _id="1" assignees={[{ username: "rahul", _id: "1", role: "admin" }]} description="this is an description" title="this is title" priority="Low" key={'1'} />)
        const content = await screen.findByText(/this is an description/i);
        expect(content).toBeInTheDocument();
    })
})