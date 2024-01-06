import App from './App'
import { render,  userEvent } from './utils/test-utils'
import {waitFor} from "@testing-library/react";
import {collections, myDatabase} from "./utils/db.ts";

describe('Simple working test', () => {
    it('should add todo', async () => {
        const screen = render(<App />)
        expect(screen.getByText(/app/i)).toBeInTheDocument();
        await userEvent.click(screen.getByText(/add/i));
        expect(screen.getByText(/test/i)).toBeInTheDocument();
        // await collections.todos.remove();
        await myDatabase.remove();
    });

    it('should clear indexeddb', async () => {
        const screen = render(<App />)
        expect(screen.getByText(/app/i)).toBeInTheDocument();
        await waitFor(() => {});
        expect(screen.findByText(/test/i)).not.toBeInTheDocument();
    });

})