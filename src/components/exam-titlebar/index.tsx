** @format */
import React, { useState } from "react";
import styles from "./styles.scss";
import { useAuth } from "../../AuthContext";
import { useNavigate } from "react-router-dom";

const ExamTitleBar = () => {
	return (
		<div className={styles.examTitleBar}>
			<div className={styles.examName}> </div>
			

		</div>
	)
}