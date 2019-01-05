import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { TrainingService } from './../training.service';
import { Exercise } from '../exercise.model';
import { UIService } from '../../shared/ui.service';

@Component({
    selector: 'app-new-training',
    templateUrl: './new-training.component.html',
    styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
    exercises: Exercise[];
    exerciseSubscription: Subscription;
    isLoading = false;
    private loadingSubs: Subscription;

    constructor(
        private trainingService: TrainingService,
        private uiService: UIService
    ) { }

    ngOnInit() {
        this.loadingSubs = this.uiService.loadingStateChange.subscribe(isLoading => {
            this.isLoading = isLoading;
        });
        this.exerciseSubscription = this.trainingService.exercisesChanged
            .subscribe((exercises) => this.exercises = exercises);
        this.fetchExercises();
    }

    fetchExercises() {
        this.trainingService.fetchAvailableExercises();
    }

    onStartTraining(form: NgForm) {
        this.trainingService.startExercise(form.value.exercise);
    }

    ngOnDestroy() {
        this.exerciseSubscription && this.exerciseSubscription.unsubscribe();
        this.loadingSubs && this.loadingSubs.unsubscribe();
    }
}
