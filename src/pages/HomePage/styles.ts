import styled from "styled-components";
import { colors } from "../../Layout/constants/colors";

export const ErrorMessage = styled.div`
    padding: 13px 20px;
    background-color: #e6e6fa;
    border-left: 4px solid ${colors.textColor};
    border-radius: 6px;
    margin-bottom: 20px;
    margin-left: 3px;
    width: fit-content;
    color: #4b0082;
    font-size: 0.95rem;
    display: flex;
    align-items: center;
    gap: 12px;
    animation: fadeIn 0.4s ease-out, shake 0.5s ease;

    &::before {
        content: "⚠️";
        font-size: 1.4rem;
    }
 `;

 export const ErrorMessageContainer = styled.div`
    display: inline-flex;
    justify-content: center;
    width: 100%;
 `